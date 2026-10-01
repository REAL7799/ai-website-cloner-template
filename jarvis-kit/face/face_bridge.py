"""Jarvis Face bridge — serves the animated face and relays Jarvis' live state.

Personal Jarvis rejects WebSocket connections from foreign browser origins
(file://, other ports), so a page cannot talk to it directly. This bridge runs
on the same machine, connects to Jarvis' local ``/ws`` as a non-browser client
(loopback, no Origin header — the same trust Jarvis gives its own tools) and
re-broadcasts a small, stable message set to the face page it serves itself:

    {"t": "link",   "jarvis": bool}                      bridge <-> Jarvis link
    {"t": "state",  "state": "idle|listening|thinking|speaking|error|paused"}
    {"t": "level",  "in": float, "out": float}           mic / speaker, 0..1
    {"t": "caption","who": "user|jarvis", "text": str, "final": bool}

The page may send {"cmd": "call"} or {"cmd": "hangup"}; the bridge forwards
them to Jarvis' REST API (the same path as the wake word and hangup hotkey).

Run it with Jarvis' own Python so ``websockets`` is already installed:
    ~/.personal-jarvis/.venv/bin/python face_bridge.py          (macOS/Linux)
    %USERPROFILE%\\.personal-jarvis\\.venv\\Scripts\\python.exe face_bridge.py  (Windows)
"""

from __future__ import annotations

import argparse
import asyncio
import contextlib
import http
import json
import logging
import os
import signal
import sys
import urllib.error
import urllib.request
import webbrowser
from pathlib import Path
from typing import Any

try:
    from websockets.asyncio.client import connect
    from websockets.asyncio.server import Server, ServerConnection, serve
    from websockets.datastructures import Headers
    from websockets.exceptions import ConnectionClosed
    from websockets.http11 import Request, Response
except ImportError:  # pragma: no cover — depends on the interpreter used
    sys.exit(
        "face_bridge: the 'websockets' package (>=13) is missing.\n"
        "Run this script with Personal Jarvis' own Python (inside ~/.personal-jarvis/.venv),\n"
        "or install it with:  python -m pip install 'websockets>=13'"
    )

log = logging.getLogger("jarvis-face")

HERE = Path(__file__).resolve().parent
STATIC_FILES = {
    "/": ("face.html", "text/html; charset=utf-8"),
    "/face.html": ("face.html", "text/html; charset=utf-8"),
    "/face.js": ("face.js", "text/javascript; charset=utf-8"),
}

# Jarvis' supervisor states (SystemStateChanged.new_state, /api/voice/state)
# folded into the six the face renders. "connecting" is a session spinning up.
STATE_MAP = {
    "idle": "idle",
    "connecting": "thinking",
    "listening": "listening",
    "thinking": "thinking",
    "speaking": "speaking",
    "error": "error",
    "paused": "paused",
}
RECONNECT_MAX_S = 10.0
LEVEL_MIN_INTERVAL_S = 1 / 45  # cap level fan-out at ~45 fps


class Bridge:
    def __init__(self, jarvis_url: str, control_key: str | None) -> None:
        self.http_base = jarvis_url.rstrip("/")
        self.ws_url = self.http_base.replace("http://", "ws://", 1).replace(
            "https://", "wss://", 1
        ) + "/ws"
        self.control_key = control_key
        self.clients: set[ServerConnection] = set()
        self.linked = False
        self.state = "idle"
        self._last_level_sent = 0.0

    # ---- fan-out ---------------------------------------------------------

    def _auth_headers(self) -> dict[str, str]:
        return {"Authorization": f"Bearer {self.control_key}"} if self.control_key else {}

    def broadcast(self, msg: dict[str, Any]) -> None:
        if not self.clients:
            return
        data = json.dumps(msg, separators=(",", ":"))
        for ws in tuple(self.clients):
            # Fire-and-forget: one slow tab must never stall the Jarvis reader.
            asyncio.ensure_future(self._safe_send(ws, data))

    async def _safe_send(self, ws: ServerConnection, data: str) -> None:
        with contextlib.suppress(ConnectionClosed):
            await asyncio.wait_for(ws.send(data), timeout=2.0)

    def set_state(self, raw: str) -> None:
        state = STATE_MAP.get(raw.strip().lower(), self.state)
        if state != self.state:
            self.state = state
            self.broadcast({"t": "state", "state": state})

    def set_link(self, linked: bool) -> None:
        if linked != self.linked:
            self.linked = linked
            self.broadcast({"t": "link", "jarvis": linked})
            if not linked:
                self.set_state("idle")

    # ---- Jarvis REST -----------------------------------------------------

    def _rest(self, method: str, path: str) -> dict[str, Any] | None:
        req = urllib.request.Request(
            self.http_base + path,
            method=method,
            headers={"Accept": "application/json", **self._auth_headers()},
            data=b"" if method == "POST" else None,
        )
        try:
            with urllib.request.urlopen(req, timeout=4) as resp:
                return json.loads(resp.read() or b"{}")
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, OSError) as exc:
            log.warning("Jarvis %s %s failed: %s", method, path, exc)
            return None

    async def rest(self, method: str, path: str) -> dict[str, Any] | None:
        return await asyncio.to_thread(self._rest, method, path)

    async def reconcile_state(self) -> None:
        """SystemStateChanged is one-shot; read the REST mirror after (re)connect."""
        snap = await self.rest("GET", "/api/voice/state")
        if snap:
            self.set_state(str(snap.get("voice_state", "idle")))

    # ---- Jarvis /ws reader -----------------------------------------------

    def handle_jarvis_frame(self, frame: dict[str, Any]) -> None:
        kind = frame.get("type")
        if kind == "audio.level":
            now = asyncio.get_running_loop().time()
            if now - self._last_level_sent >= LEVEL_MIN_INTERVAL_S:
                self._last_level_sent = now
                self.broadcast(
                    {
                        "t": "level",
                        "in": round(float(frame.get("input", 0.0)), 3),
                        "out": round(float(frame.get("output", 0.0)), 3),
                    }
                )
            return
        if kind != "event":
            return
        name = frame.get("event_name", "")
        payload = frame.get("payload") or {}
        if name == "SystemStateChanged":
            self.set_state(str(payload.get("new_state", "IDLE")))
        elif name == "TranscriptionUpdate":
            text = str(payload.get("text", "")).strip()
            if text:
                self.broadcast({"t": "caption", "who": "user", "text": text, "final": False})
        elif name == "TranscriptFinal":
            transcript = payload.get("transcript") or {}
            text = str(transcript.get("text", "") if isinstance(transcript, dict) else "").strip()
            if text:
                self.broadcast({"t": "caption", "who": "user", "text": text, "final": True})
        elif name == "AssistantTextDelta":
            text = str(payload.get("text", "")).strip()
            if text:
                self.broadcast(
                    {
                        "t": "caption",
                        "who": "jarvis",
                        "text": text,
                        "final": bool(payload.get("done", False)),
                    }
                )
        elif name == "SpeechSpoken":
            text = str(payload.get("text", "")).strip()
            if text:
                self.broadcast({"t": "caption", "who": "jarvis", "text": text, "final": True})

    async def jarvis_loop(self) -> None:
        delay = 0.5
        while True:
            try:
                async with connect(
                    self.ws_url,
                    additional_headers=self._auth_headers(),
                    open_timeout=5,
                    ping_interval=20,
                    max_size=4 * 1024 * 1024,
                ) as ws:
                    log.info("Linked to Jarvis at %s", self.ws_url)
                    delay = 0.5
                    self.set_link(True)
                    await self.reconcile_state()
                    async for raw in ws:
                        try:
                            frame = json.loads(raw)
                        except (TypeError, json.JSONDecodeError):
                            continue
                        if isinstance(frame, dict):
                            self.handle_jarvis_frame(frame)
            except asyncio.CancelledError:
                raise
            except Exception as exc:  # noqa: BLE001 — any failure means "reconnect"
                if self.linked:
                    log.warning("Lost Jarvis link: %s", exc)
                else:
                    log.debug("Jarvis not reachable yet: %s", exc)
                if "401" in str(exc) or "4401" in str(exc):
                    log.error(
                        "Jarvis refused the connection (browser lock is on). "
                        "Set JARVIS_CONTROL_KEY — see `jarvis api control api-key`."
                    )
            self.set_link(False)
            await asyncio.sleep(delay)
            delay = min(delay * 2, RECONNECT_MAX_S)

    # ---- face page server ------------------------------------------------

    def process_request(self, connection: ServerConnection, request: Request) -> Response | None:
        path = request.path.split("?", 1)[0]
        if path == "/bridge":
            # Only same-origin pages may drive the bridge (blocks other sites
            # in the browser from starting voice sessions via this port).
            origin = request.headers.get("Origin")
            host = request.headers.get("Host", "")
            if origin is not None and origin not in {f"http://{host}"}:
                return connection.respond(http.HTTPStatus.FORBIDDEN, "foreign origin\n")
            return None
        entry = STATIC_FILES.get(path)
        if entry is None:
            return connection.respond(http.HTTPStatus.NOT_FOUND, "not found\n")
        filename, ctype = entry
        try:
            body = (HERE / filename).read_bytes()
        except OSError:
            return connection.respond(http.HTTPStatus.NOT_FOUND, "missing file\n")
        headers = Headers(
            {
                "Content-Type": ctype,
                "Content-Length": str(len(body)),
                "Cache-Control": "no-store",
                "X-Content-Type-Options": "nosniff",
                "Content-Security-Policy": (
                    "default-src 'self'; connect-src 'self'; "
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
                    "font-src https://fonts.gstatic.com; img-src 'self' data:"
                ),
            }
        )
        return Response(http.HTTPStatus.OK, "OK", headers, body)

    async def page_handler(self, ws: ServerConnection) -> None:
        self.clients.add(ws)
        try:
            await ws.send(json.dumps({"t": "link", "jarvis": self.linked}))
            await ws.send(json.dumps({"t": "state", "state": self.state}))
            async for raw in ws:
                try:
                    cmd = json.loads(raw).get("cmd")
                except (AttributeError, TypeError, json.JSONDecodeError):
                    continue
                if cmd == "call":
                    result = await self.rest("POST", "/api/voice/call")
                    await ws.send(json.dumps({"t": "ack", "cmd": cmd, "ok": bool(result)}))
                elif cmd == "hangup":
                    result = await self.rest("POST", "/api/voice/hangup")
                    await ws.send(json.dumps({"t": "ack", "cmd": cmd, "ok": bool(result)}))
        except ConnectionClosed:
            pass
        finally:
            self.clients.discard(ws)


async def main_async(args: argparse.Namespace) -> None:
    bridge = Bridge(args.jarvis, os.environ.get("JARVIS_CONTROL_KEY") or None)
    server: Server = await serve(
        bridge.page_handler,
        "127.0.0.1",
        args.port,
        process_request=bridge.process_request,
    )
    url = f"http://127.0.0.1:{args.port}/"
    log.info("Jarvis Face ready at %s (waiting for Jarvis at %s)", url, bridge.http_base)
    if args.open:
        webbrowser.open(url)

    stop = asyncio.Event()
    loop = asyncio.get_running_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        with contextlib.suppress(NotImplementedError, RuntimeError):
            loop.add_signal_handler(sig, stop.set)

    reader = asyncio.create_task(bridge.jarvis_loop())
    try:
        await stop.wait()
    finally:
        reader.cancel()
        server.close()
        await server.wait_closed()


def main() -> None:
    parser = argparse.ArgumentParser(description="Animated face for Personal Jarvis")
    parser.add_argument(
        "--jarvis",
        default=os.environ.get("JARVIS_URL", "http://127.0.0.1:47821"),
        help="Jarvis local server (default: %(default)s)",
    )
    parser.add_argument("--port", type=int, default=int(os.environ.get("JARVIS_FACE_PORT", 47900)))
    parser.add_argument("--open", action="store_true", help="open the face in the browser")
    parser.add_argument("-v", "--verbose", action="store_true")
    args = parser.parse_args()
    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(asctime)s  %(message)s",
        datefmt="%H:%M:%S",
    )
    # websockets' own DEBUG output is frame-level noise; keep ours only.
    logging.getLogger("websockets").setLevel(logging.WARNING)
    with contextlib.suppress(KeyboardInterrupt):
        asyncio.run(main_async(args))


if __name__ == "__main__":
    main()
