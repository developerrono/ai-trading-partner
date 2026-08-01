import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, LineChart } from "lucide-react";

import { Panel, PageHeader } from "@/components/common/Panel";
import { Chip } from "@/components/common/StatusDot";
import { instruments, watchlist, economicEvents } from "@/lib/mock-data";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Market — RONO AI Trading Partner" },
      {
        name: "description",
        content: "Monitor Gold, Silver and the Dollar Index with session context and trend notes.",
      },
      { property: "og:title", content: "Market — RONO AI Trading Partner" },
      {
        property: "og:description",
        content: "Gold, Silver and DXY monitoring with session context and trend notes.",
      },
    ],
  }),
  component: Market,
});

function Market() {
  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader
        title="Market"
        description="Focused monitoring of the three instruments in your playbook."
        action={<Chip variant="outline">London session</Chip>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {instruments.map((i) => (
          <div key={i.symbol} className="panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{i.name}</p>
                <p className="num text-[11px] text-muted-foreground">{i.symbol}</p>
              </div>
              <Chip variant="outline">{i.session}</Chip>
            </div>
            <p className="num mt-4 text-3xl font-semibold tracking-tight">{i.price}</p>
            <p
              className={`num mt-1 flex items-center gap-1 text-sm ${
                i.direction === "up" ? "text-foreground" : "text-negative"
              }`}
            >
              {i.direction === "up" ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {i.change} ({i.changePct})
            </p>

            <dl className="mt-5 space-y-3 border-t border-border pt-4 text-xs">
              <div>
                <dt className="label-xs">Trend</dt>
                <dd className="mt-1 text-muted-foreground">{i.trend}</dd>
              </div>
              <div>
                <dt className="label-xs">Notes</dt>
                <dd className="mt-1 text-muted-foreground">{i.notes}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <Panel title="Charts" subtitle="TradingView integration reserved for a future release">
        <div className="grid gap-4 lg:grid-cols-2">
          {["XAU/USD · H4", "DXY · H1"].map((c) => (
            <div
              key={c}
              className="grid h-64 place-items-center rounded-xl border border-dashed border-border-strong bg-surface"
            >
              <div className="text-center">
                <LineChart className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="num mt-3 text-sm">{c}</p>
                <p className="mt-1 text-xs text-muted-foreground">Chart slot reserved</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Watchlist">
          <ul className="divide-y divide-border">
            {watchlist.map((w) => (
              <li key={w.symbol} className="flex items-center justify-between py-3 first:pt-0">
                <span className="num text-sm font-medium">{w.symbol}</span>
                <div className="flex items-center gap-4">
                  <span className="num text-sm">{w.price}</span>
                  <span
                    className={`num text-xs ${
                      w.direction === "up" ? "text-foreground" : "text-negative"
                    }`}
                  >
                    {w.change}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Today's events">
          <ul className="space-y-3">
            {economicEvents.map((e) => (
              <li
                key={e.event}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5"
              >
                <span className="num w-12 shrink-0 text-xs text-muted-foreground">{e.time}</span>
                <span className="min-w-0 flex-1 truncate text-sm">{e.event}</span>
                <Chip variant={e.impact === "High" ? "solid" : "outline"}>{e.impact}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
