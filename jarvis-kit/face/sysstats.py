"""Live system readings for the HUD panels (CPU, memory, disks, network, battery).

Uses psutil, which Personal Jarvis already depends on. Every reading is real;
anything the machine cannot report (no battery, no per-core data) is sent as
null and the HUD hides that panel instead of inventing a value.
"""

from __future__ import annotations

import os
import platform
import socket
import time
from typing import Any

try:
    import psutil
except ImportError:  # pragma: no cover — psutil ships with Jarvis
    psutil = None  # type: ignore[assignment]


class SystemSampler:
    """Call :meth:`sample` about once a second; rates are computed between calls."""

    def __init__(self) -> None:
        self.available = psutil is not None
        self._last_net: tuple[float, int, int] | None = None
        self._disks: list[str] = []
        self._disks_at = 0.0
        if self.available:
            psutil.cpu_percent(percpu=True)  # prime: the first non-blocking call returns 0

    def _disk_mounts(self) -> list[str]:
        # Re-scan occasionally so a plugged USB drive appears; skip optical/empty drives.
        now = time.monotonic()
        if now - self._disks_at > 60 or not self._disks:
            mounts = []
            for part in psutil.disk_partitions(all=False):
                if "cdrom" in part.opts or not part.fstype:
                    continue
                mounts.append(part.mountpoint)
            self._disks, self._disks_at = mounts[:4], now
        return self._disks

    def sample(self) -> dict[str, Any]:
        if not self.available:
            return {"t": "sys", "available": False}
        per_core = psutil.cpu_percent(percpu=True)
        mem = psutil.virtual_memory()

        disks = []
        for mount in self._disk_mounts():
            try:
                du = psutil.disk_usage(mount)
            except OSError:
                continue
            if du.total < 1024**3:  # tiny system/image mounts are noise on a HUD
                continue
            disks.append({"name": mount.rstrip("\\/") or mount, "used": du.used, "total": du.total, "pct": du.percent})

        net = psutil.net_io_counters()
        now = time.monotonic()
        up = down = None
        if self._last_net is not None and net is not None:
            dt = max(1e-3, now - self._last_net[0])
            up = max(0.0, (net.bytes_sent - self._last_net[1]) / dt)
            down = max(0.0, (net.bytes_recv - self._last_net[2]) / dt)
        if net is not None:
            self._last_net = (now, net.bytes_sent, net.bytes_recv)

        battery = None
        try:
            b = psutil.sensors_battery()
        except (AttributeError, NotImplementedError, OSError):
            b = None
        if b is not None:
            battery = {"pct": round(b.percent), "plugged": bool(b.power_plugged)}

        freq = None
        try:
            f = psutil.cpu_freq()
            freq = round(f.current) if f and f.current else None
        except (AttributeError, NotImplementedError, OSError):
            pass

        return {
            "t": "sys",
            "available": True,
            "cpu": round(sum(per_core) / max(1, len(per_core)), 1),
            "cores": [round(c) for c in per_core],
            "freq": freq,
            "mem": {"used": mem.total - mem.available, "total": mem.total, "pct": mem.percent},
            "disks": disks,
            "net": {"up": up, "down": down},
            "battery": battery,
            "uptime": int(time.time() - psutil.boot_time()),
            "procs": len(psutil.pids()),
            "host": socket.gethostname(),
            "os": f"{platform.system()} {platform.release()}",
            "user": os.environ.get("USERNAME") or os.environ.get("USER") or "",
        }
