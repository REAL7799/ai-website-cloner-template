"use client";

import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const WEEKDAYS_SHORT = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];

interface OpenState {
  open: boolean;
  label: string;
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function slotFor(weekday: number) {
  return siteConfig.schedule.find((slot) =>
    (slot.days as readonly number[]).includes(weekday)
  );
}

function computeState(): OpenState {
  // Hora local da loja, independentemente do fuso do visitante
  const parts = new Intl.DateTimeFormat("pt-PT", {
    timeZone: siteConfig.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";
  const weekday = WEEKDAYS_SHORT.findIndex((day) =>
    get("weekday").toLowerCase().startsWith(day.slice(0, 3))
  );
  const now = Number(get("hour")) * 60 + Number(get("minute"));

  const today = slotFor(weekday);
  if (today && now >= toMinutes(today.open) && now < toMinutes(today.close)) {
    return { open: true, label: `Aberto agora · fecha às ${today.close}` };
  }
  if (today && now < toMinutes(today.open)) {
    return { open: false, label: `Fechado · abre hoje às ${today.open}` };
  }
  for (let offset = 1; offset <= 7; offset += 1) {
    const next = slotFor((weekday + offset) % 7);
    if (next) {
      const dayName =
        offset === 1 ? "amanhã" : WEEKDAYS_SHORT[(weekday + offset) % 7];
      return { open: false, label: `Fechado · abre ${dayName} às ${next.open}` };
    }
  }
  return { open: false, label: "Fechado" };
}

export function OpenNowBadge({ className }: { className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(computeState());
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Evita mismatch de hidratação: só aparece depois de montar
  if (!state) return null;

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold",
        state.open
          ? "border-[#6fbe83]/30 bg-[#6fbe83]/10 text-[#8fd4a1]"
          : "border-accent/35 bg-accent/10 text-accent",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex size-2 rounded-full",
          state.open ? "bg-[#6fbe83]" : "bg-accent"
        )}
      >
        {state.open ? (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#6fbe83] opacity-60" />
        ) : null}
      </span>
      {state.label}
    </p>
  );
}
