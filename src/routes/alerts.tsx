import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Brain, CalendarClock, Newspaper, TrendingUp } from "lucide-react";

import { Panel, PageHeader } from "@/components/common/Panel";
import { Chip } from "@/components/common/StatusDot";
import { alerts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — RONO AI Trading Partner" },
      {
        name: "description",
        content: "Price alerts, session alerts, economic news and AI reminders in one feed.",
      },
      { property: "og:title", content: "Alerts — RONO AI Trading Partner" },
      {
        property: "og:description",
        content: "Price, session, news and AI reminder notifications in one feed.",
      },
    ],
  }),
  component: Alerts,
});

const filters = ["All", "Price", "Session", "News", "AI"] as const;

const icons: Record<string, typeof Bell> = {
  Price: TrendingUp,
  Session: CalendarClock,
  News: Newspaper,
  AI: Brain,
};

function Alerts() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = alerts.filter((a) => active === "All" || a.type === active);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <PageHeader
        title="Alerts"
        description="Everything RONO flagged for you, newest first."
        action={<Chip variant="outline">{alerts.filter((a) => a.unread).length} unread</Chip>}
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition-colors",
              active === f
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {list.map((a) => {
          const Icon = icons[a.type] ?? Bell;
          return (
            <article
              key={a.id}
              className={cn(
                "panel grid grid-cols-[auto_minmax(0,1fr)] gap-4 p-4",
                a.unread && "border-border-strong",
              )}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-2">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <h3 className="truncate text-sm font-medium">{a.title}</h3>
                    {a.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Chip variant="outline">{a.type}</Chip>
                    <span className="text-[11px] text-muted-foreground">{a.time}</span>
                  </div>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{a.body}</p>
              </div>
            </article>
          );
        })}
        {list.length === 0 && (
          <Panel>
            <p className="py-6 text-center text-sm text-muted-foreground">No alerts here.</p>
          </Panel>
        )}
      </div>
    </div>
  );
}
