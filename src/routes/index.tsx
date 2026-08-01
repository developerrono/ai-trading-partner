import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

import { Panel } from "@/components/common/Panel";
import { StatCard } from "@/components/common/StatCard";
import { Chip, StatusDot } from "@/components/common/StatusDot";
import { Progress } from "@/components/ui/progress";
import {
  watchlist,
  economicEvents,
  alerts,
  recentJournal,
  journalStats,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — RONO AI Trading Partner" },
      {
        name: "description",
        content:
          "Daily briefing, market bias, watchlist, alerts and performance in one trading desk view.",
      },
      { property: "og:title", content: "Dashboard — RONO AI Trading Partner" },
      {
        property: "og:description",
        content: "Daily briefing, market bias, watchlist, alerts and performance overview.",
      },
    ],
  }),
  component: Dashboard,
});

const sessions = [
  { name: "Asia", window: "00:00 – 08:00", state: "Closed" },
  { name: "London", window: "08:00 – 16:30", state: "Active" },
  { name: "New York", window: "13:30 – 21:00", state: "Upcoming" },
];

function Dashboard() {
  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <section className="panel grid grid-cols-[minmax(0,1fr)] gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <StatusDot tone="active" label="London session · RONO monitoring" />
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Good morning, Rono.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Metals are firm, the dollar is soft, and Core PCE prints at 13:30. Your plan calls for
            observation through the first London hour before the first entry.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link
            to="/ai-partner"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" /> Open AI Partner
          </Link>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-2"
          >
            Log a trade
          </Link>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Net P&L (Month)" value={journalStats.netPnl} delta="July 2026" icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Win rate" value={`${journalStats.winRate}%`} delta={`${journalStats.trades} trades`} />
        <StatCard label="Average R" value={journalStats.avgRR} delta={`Profit factor ${journalStats.profitFactor}`} />
        <StatCard label="Max drawdown" value={journalStats.maxDrawdown} delta="Within 6% limit" direction="down" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          title="Daily market briefing"
          subtitle="Generated 07:12 · RONO"
          className="xl:col-span-2"
          action={<Chip variant="outline">AI</Chip>}
        >
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Gold opened the London session above the weekly open and continues to respect the
              2,398 demand zone. Dollar softness into the Core PCE print is the primary tailwind,
              while silver lags and has yet to reclaim 31.45.
            </p>
            <ul className="space-y-2">
              {[
                "Primary scenario: pullback into 2,398–2,402 then continuation toward 2,425 liquidity.",
                "Alternative: H4 close under 2,392 flips the read to neutral and cancels longs.",
                "Risk window: 13:15 – 13:45 around Core PCE. No new positions.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel title="Market bias" subtitle="Updated 5 min ago">
          <div className="space-y-4">
            {[
              { name: "Gold", bias: "Bullish", conf: 72 },
              { name: "Silver", bias: "Neutral", conf: 48 },
              { name: "DXY", bias: "Bearish", conf: 61 },
            ].map((b) => (
              <div key={b.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{b.name}</span>
                  <Chip>{b.bias}</Chip>
                </div>
                <Progress value={b.conf} className="mt-2 h-1.5 bg-secondary" />
                <p className="num mt-1 text-[11px] text-muted-foreground">
                  Confidence {b.conf}%
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Current trading session" action={<Clock className="h-4 w-4 text-muted-foreground" />}>
          <ul className="space-y-3">
            {sessions.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{s.name}</p>
                  <p className="num text-[11px] text-muted-foreground">{s.window}</p>
                </div>
                <Chip variant={s.state === "Active" ? "solid" : "outline"}>{s.state}</Chip>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Economic calendar"
          subtitle="Today"
          action={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
        >
          <ul className="space-y-3">
            {economicEvents.map((e) => (
              <li key={e.event} className="flex items-start gap-3">
                <span className="num w-12 shrink-0 text-xs text-muted-foreground">{e.time}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{e.event}</p>
                  <p className="text-[11px] text-muted-foreground">{e.region}</p>
                </div>
                <Chip variant={e.impact === "High" ? "solid" : "outline"}>{e.impact}</Chip>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Watchlist" subtitle="6 instruments">
          <ul className="divide-y divide-border">
            {watchlist.map((w) => (
              <li key={w.symbol} className="flex items-center justify-between py-2.5 first:pt-0">
                <span className="num text-sm font-medium">{w.symbol}</span>
                <div className="flex items-center gap-3">
                  <span className="num text-sm">{w.price}</span>
                  <span
                    className={`num inline-flex items-center gap-1 text-xs ${
                      w.direction === "up" ? "text-foreground" : "text-negative"
                    }`}
                  >
                    {w.direction === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {w.change}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          title="Latest alerts"
          action={
            <Link to="/alerts" className="text-xs text-muted-foreground hover:text-foreground">
              View all
            </Link>
          }
        >
          <ul className="space-y-3">
            {alerts.slice(0, 4).map((a) => (
              <li key={a.id} className="rounded-lg border border-border bg-surface p-3">
                <div className="flex items-center justify-between gap-3">
                  <Chip variant="outline">{a.type}</Chip>
                  <span className="text-[11px] text-muted-foreground">{a.time}</span>
                </div>
                <p className="mt-2 text-sm">{a.title}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="AI summary" subtitle="Behaviour insight" action={<Chip variant="outline">AI</Chip>}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your execution quality is highest in the first three hours of London. Over the last 20
            trades, entries placed after 16:00 produced a negative expectancy of -0.4R while
            morning entries averaged +1.6R.
          </p>
          <div className="mt-4 space-y-2">
            {["Keep risk at 1% per trade", "No re-entry within 40 minutes of a stop-out", "Document every trade before close"].map(
              (t) => (
                <div
                  key={t}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted-foreground"
                >
                  {t}
                </div>
              ),
            )}
          </div>
        </Panel>

        <Panel
          title="Recent journal entries"
          action={
            <Link to="/journal" className="text-xs text-muted-foreground hover:text-foreground">
              Open journal
            </Link>
          }
        >
          <ol className="relative space-y-5 border-l border-border pl-5">
            {recentJournal.map((j) => (
              <li key={j.id} className="relative">
                <span className="absolute -left-[1.44rem] top-1.5 h-2 w-2 rounded-full bg-border-strong" />
                <div className="flex items-center justify-between gap-3">
                  <span className="num text-sm font-medium">{j.symbol}</span>
                  <Chip variant={j.result === "Win" ? "solid" : "outline"}>{j.rr}</Chip>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{j.note}</p>
                <p className="num mt-1 text-[11px] text-muted-foreground">
                  {j.id} · {j.date}
                </p>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  );
}
