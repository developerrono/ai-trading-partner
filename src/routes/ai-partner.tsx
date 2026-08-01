import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Bot, Brain, Sun } from "lucide-react";

import { Panel } from "@/components/common/Panel";
import { Chip, StatusDot } from "@/components/common/StatusDot";
import { Textarea } from "@/components/ui/textarea";
import { chatSeed, suggestedPrompts, aiMemory } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai-partner")({
  head: () => ({
    meta: [
      { title: "AI Partner — RONO AI Trading Partner" },
      {
        name: "description",
        content:
          "Talk to your AI trading partner: briefings, trade plans, reviews and behavioural coaching.",
      },
      { property: "og:title", content: "AI Partner — RONO AI Trading Partner" },
      {
        property: "og:description",
        content: "Briefings, trade plans, reviews and behavioural coaching from your AI partner.",
      },
    ],
  }),
  component: AiPartner,
});

type Message = { role: "user" | "assistant"; content: string };

function AiPartner() {
  const [messages, setMessages] = useState<Message[]>(chatSeed);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [
      ...m,
      { role: "user", content: value },
      {
        role: "assistant",
        content:
          "Noted. This workspace is running on placeholder responses — connect a model later and RONO will answer with live market context, your journal history and the rules stored in memory.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="mx-auto grid max-w-[1600px] gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Panel
        className="min-h-[70vh]"
        bodyClassName="flex flex-col gap-6 p-0"
        title="RONO"
        subtitle="Your trading partner"
        action={<StatusDot tone="active" label="Online" />}
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}
            >
              {m.role === "assistant" && (
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-surface-2">
                  <Bot className="h-4 w-4" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-2xl whitespace-pre-line text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-primary-foreground"
                    : "text-foreground",
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border px-5 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestedPrompts.slice(0, 4).map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                {p}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="relative"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask RONO about bias, risk, setups or your journal…"
              className="min-h-24 resize-none border-border bg-surface pr-14 text-sm"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
        </div>
      </Panel>

      <div className="flex flex-col gap-6">
        <Panel title="AI status">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Connection</span>
              <StatusDot tone="active" label="Online" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Mode</span>
              <Chip>Trading partner</Chip>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Data feed</span>
              <Chip variant="outline">Placeholder</Chip>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last sync</span>
              <span className="num text-xs text-muted-foreground">07:12</span>
            </div>
          </div>
        </Panel>

        <Panel title="Memory" action={<Brain className="h-4 w-4 text-muted-foreground" />}>
          <ul className="space-y-2">
            {aiMemory.map((m) => (
              <li
                key={m}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-xs leading-relaxed text-muted-foreground"
              >
                {m}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Daily briefing" action={<Sun className="h-4 w-4 text-muted-foreground" />}>
          <p className="text-xs leading-relaxed text-muted-foreground">
            London active · Gold bullish above 2,398 · Dollar soft · Core PCE 13:30. No new
            positions inside the news window.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { k: "Bias", v: "Bullish" },
              { k: "Risk left", v: "2.0%" },
              { k: "Setups", v: "2 tracked" },
              { k: "News", v: "1 high" },
            ].map((i) => (
              <div key={i.k} className="rounded-lg border border-border bg-surface px-3 py-2">
                <p className="label-xs">{i.k}</p>
                <p className="num mt-1 text-sm">{i.v}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
