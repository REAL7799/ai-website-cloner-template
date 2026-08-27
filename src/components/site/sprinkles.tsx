import { cn } from "@/lib/utils";

interface SprinklesProps {
  className?: string;
  variant?: "hero" | "section";
}

const heroShapes = [
  "left-[8%] top-[18%] h-2.5 w-8 rotate-[24deg] rounded-full bg-primary/25",
  "left-[16%] top-[70%] h-2 w-2 rounded-full bg-primary/30",
  "left-[30%] top-[12%] h-2 w-7 -rotate-[18deg] rounded-full bg-accent-foreground/20",
  "left-[55%] top-[8%] h-3 w-3 rounded-full border-2 border-primary/25",
  "left-[70%] top-[20%] h-2.5 w-9 rotate-[40deg] rounded-full bg-primary/20",
  "left-[85%] top-[60%] h-2 w-6 -rotate-[30deg] rounded-full bg-muted-foreground/25",
  "left-[90%] top-[30%] h-2 w-2 rounded-full bg-primary/35",
  "left-[42%] top-[80%] h-2 w-7 rotate-[12deg] rounded-full bg-accent-foreground/15",
];

const sectionShapes = [
  "left-[5%] top-[12%] h-2 w-7 rotate-[20deg] rounded-full bg-primary/15",
  "left-[93%] top-[18%] h-2.5 w-2.5 rounded-full bg-primary/20",
  "left-[88%] top-[75%] h-2 w-8 -rotate-[24deg] rounded-full bg-accent-foreground/15",
  "left-[7%] top-[80%] h-3 w-3 rounded-full border-2 border-primary/20",
  "left-[48%] top-[6%] h-2 w-6 rotate-[45deg] rounded-full bg-muted-foreground/20",
];

/**
 * Confetes/granulados decorativos que flutuam suavemente — mantêm a vibe
 * de pastelaria em todas as secções.
 */
export function Sprinkles({ className, variant = "section" }: SprinklesProps) {
  const shapes = variant === "hero" ? heroShapes : sectionShapes;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {shapes.map((shape, i) => (
        <span
          key={i}
          className={cn("absolute animate-float", shape)}
          style={{
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${5 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}
