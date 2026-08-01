import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  direction,
  icon,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  direction?: "up" | "down" | "flat";
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("panel p-5", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="label-xs truncate">{label}</span>
        {icon ? <span className="shrink-0 text-muted-foreground">{icon}</span> : null}
      </div>
      <p className="num mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      {delta && (
        <p
          className={cn(
            "num mt-1 text-xs",
            direction === "down" ? "text-negative" : "text-muted-foreground",
          )}
        >
          {delta}
        </p>
      )}
    </div>
  );
}
