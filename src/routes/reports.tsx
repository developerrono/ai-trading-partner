import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";

import { Panel, PageHeader } from "@/components/common/Panel";
import { Chip } from "@/components/common/StatusDot";
import { reports, equityCurve } from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — RONO AI Trading Partner" },
      {
        name: "description",
        content: "Daily, weekly and monthly performance reports with AI-generated summaries.",
      },
      { property: "og:title", content: "Reports — RONO AI Trading Partner" },
      {
        property: "og:description",
        content: "Daily, weekly and monthly performance reports with AI summaries.",
      },
    ],
  }),
  component: Reports,
});

function Reports() {
  const max = Math.max(...equityCurve.map((p) => p.value));
  const min = Math.min(...equityCurve.map((p) => p.value));

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <PageHeader
        title="Reports"
        description="Structured reviews of your trading, written by RONO."
        action={
          <button className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-3 py-2 text-xs font-medium transition-colors hover:bg-surface-2">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        }
      />

      <Panel title="Equity curve" subtitle="Last 8 weeks">
        <div className="flex h-40 items-end gap-2">
          {equityCurve.map((p) => {
            const h = ((p.value - min) / (max - min)) * 85 + 15;
            return (
              <div key={p.day} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-secondary"
                  style={{ height: `${h}%` }}
                  title={`${p.day}: $${p.value.toLocaleString()}`}
                />
                <span className="num truncate text-[10px] text-muted-foreground">{p.day}</span>
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-3">
        {reports.map((r) => (
          <Panel
            key={r.period}
            title={r.period}
            subtitle={r.range}
            action={<FileText className="h-4 w-4 text-muted-foreground" />}
          >
            <div className="grid grid-cols-2 gap-2">
              {r.stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-surface px-3 py-2">
                  <p className="label-xs truncate">{s.label}</p>
                  <p className="num mt-1 text-sm font-medium">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center gap-2">
                <Chip variant="outline">AI summary</Chip>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{r.summary}</p>
            </div>

            <ul className="mt-4 space-y-2 border-t border-border pt-4">
              {r.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-xs text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </div>
  );
}
