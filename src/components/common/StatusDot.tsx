import { cn } from "@/lib/utils";

export function StatusDot({
  tone = "active",
  label,
  className,
}: {
  tone?: "active" | "idle" | "off";
  label?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs text-muted-foreground", className)}>
      <span className="relative flex h-2 w-2 shrink-0">
        {tone === "active" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/50" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            tone === "active" && "bg-foreground",
            tone === "idle" && "bg-muted-foreground",
            tone === "off" && "bg-border-strong",
          )}
        />
      </span>
      {label}
    </span>
  );
}

export function Chip({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "solid";
}) {
  return (
    <span
      className={cn(
        "num inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide",
        variant === "default" && "bg-secondary text-secondary-foreground",
        variant === "outline" && "border border-border-strong text-muted-foreground",
        variant === "solid" && "bg-primary text-primary-foreground",
      )}
    >
      {children}
    </span>
  );
}
