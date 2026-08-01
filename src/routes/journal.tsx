import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { Panel, PageHeader } from "@/components/common/Panel";
import { StatCard } from "@/components/common/StatCard";
import { Chip } from "@/components/common/StatusDot";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trades, journalStats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — RONO AI Trading Partner" },
      {
        name: "description",
        content: "Trade history, execution notes and performance statistics for every position.",
      },
      { property: "og:title", content: "Journal — RONO AI Trading Partner" },
      {
        property: "og:description",
        content: "Trade history, execution notes and performance statistics.",
      },
    ],
  }),
  component: Journal,
});

function Journal() {
  const [selectedId, setSelectedId] = useState(trades[0].id);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () =>
      trades.filter((t) => {
        const matchesQuery =
          !query ||
          `${t.symbol} ${t.id} ${t.setup}`.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = filter === "all" || t.result.toLowerCase() === filter;
        return matchesQuery && matchesFilter;
      }),
    [query, filter],
  );

  const selected = trades.find((t) => t.id === selectedId) ?? trades[0];

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader title="Journal" description="Every trade, with the reasoning behind it." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Win rate" value={`${journalStats.winRate}%`} delta={`${journalStats.trades} trades logged`} />
        <StatCard label="Average R:R" value={journalStats.avgRR} delta={`Profit factor ${journalStats.profitFactor}`} />
        <StatCard label="Net P&L" value={journalStats.netPnl} delta="July 2026" />
        <StatCard label="Avg hold time" value={journalStats.avgHold} delta={`Best session · ${journalStats.bestSession}`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Panel
          title="Trade history"
          bodyClassName="p-0"
          action={
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="h-8 w-40 border-border bg-surface pl-8 text-xs"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="h-8 w-28 border-border bg-surface text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="win">Wins</SelectItem>
                  <SelectItem value="loss">Losses</SelectItem>
                  <SelectItem value="break-even">Break-even</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="label-xs">ID</TableHead>
                  <TableHead className="label-xs">Date</TableHead>
                  <TableHead className="label-xs">Symbol</TableHead>
                  <TableHead className="label-xs">Side</TableHead>
                  <TableHead className="label-xs">R</TableHead>
                  <TableHead className="label-xs text-right">P&L</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow
                    key={t.id}
                    onClick={() => setSelectedId(t.id)}
                    className={cn(
                      "cursor-pointer border-border",
                      t.id === selected.id && "bg-surface-2",
                    )}
                  >
                    <TableCell className="num text-xs text-muted-foreground">{t.id}</TableCell>
                    <TableCell className="num text-xs">{t.date}</TableCell>
                    <TableCell className="num text-xs font-medium">{t.symbol}</TableCell>
                    <TableCell>
                      <Chip variant="outline">{t.side}</Chip>
                    </TableCell>
                    <TableCell className="num text-xs">{t.rr}</TableCell>
                    <TableCell
                      className={cn(
                        "num text-right text-xs",
                        t.pnl < 0 ? "text-negative" : "text-foreground",
                      )}
                    >
                      {t.pnl > 0 ? "+" : ""}
                      {t.pnl.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                      No trades match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel title="Trade detail" subtitle={selected.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="num text-lg font-semibold">{selected.symbol}</p>
                <p className="text-xs text-muted-foreground">
                  {selected.side} · {selected.session}
                </p>
              </div>
              <Chip variant={selected.result === "Win" ? "solid" : "outline"}>
                {selected.result}
              </Chip>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3">
              {[
                { k: "Entry", v: selected.entry },
                { k: "Exit", v: selected.exit },
                { k: "Size", v: selected.size },
                { k: "R multiple", v: selected.rr },
              ].map((row) => (
                <div key={row.k} className="rounded-lg border border-border bg-surface px-3 py-2">
                  <dt className="label-xs">{row.k}</dt>
                  <dd className="num mt-1 text-sm">{row.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 space-y-3 border-t border-border pt-4 text-xs">
              <div>
                <p className="label-xs">Setup</p>
                <p className="mt-1 text-muted-foreground">{selected.setup}</p>
              </div>
              <div>
                <p className="label-xs">Notes</p>
                <p className="mt-1 leading-relaxed text-muted-foreground">{selected.notes}</p>
              </div>
              <div>
                <p className="label-xs">State of mind</p>
                <p className="mt-1 text-muted-foreground">{selected.emotion}</p>
              </div>
            </div>
          </Panel>

          <Panel title="Performance summary">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Win rate</span>
                  <span className="num">{journalStats.winRate}%</span>
                </div>
                <Progress value={journalStats.winRate} className="mt-2 h-1.5 bg-secondary" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Risk-to-reward achieved</span>
                  <span className="num">1.9 / 2.0 target</span>
                </div>
                <Progress value={95} className="mt-2 h-1.5 bg-secondary" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Journal completion</span>
                  <span className="num">88%</span>
                </div>
                <Progress value={88} className="mt-2 h-1.5 bg-secondary" />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
