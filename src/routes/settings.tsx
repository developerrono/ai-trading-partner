import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, Palette, Shield, User, Bell, Bot } from "lucide-react";

import { Panel, PageHeader } from "@/components/common/Panel";
import { Chip } from "@/components/common/StatusDot";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — RONO AI Trading Partner" },
      {
        name: "description",
        content: "Manage your profile, theme, notifications, API keys, AI behaviour and security.",
      },
      { property: "og:title", content: "Settings — RONO AI Trading Partner" },
      {
        property: "og:description",
        content: "Profile, theme, notifications, API keys, AI behaviour and security settings.",
      },
    ],
  }),
  component: Settings,
});

function Row({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-3 last:border-0">
      <div className="min-w-0">
        <p className="text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function Settings() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <PageHeader title="Settings" description="Configure your workspace and how RONO behaves." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Profile" action={<User className="h-4 w-4 text-muted-foreground" />}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-lg font-semibold">
                RN
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Rono</p>
                <p className="truncate text-xs text-muted-foreground">Independent trader</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="label-xs">Display name</Label>
                <Input defaultValue="Rono" className="border-border bg-surface" />
              </div>
              <div className="space-y-1.5">
                <Label className="label-xs">Email</Label>
                <Input defaultValue="rono@tradingdesk.io" className="border-border bg-surface" />
              </div>
              <div className="space-y-1.5">
                <Label className="label-xs">Base currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger className="border-border bg-surface">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="label-xs">Timezone</Label>
                <Select defaultValue="london">
                  <SelectTrigger className="border-border bg-surface">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="london">Europe/London</SelectItem>
                    <SelectItem value="ny">America/New_York</SelectItem>
                    <SelectItem value="dubai">Asia/Dubai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Theme" action={<Palette className="h-4 w-4 text-muted-foreground" />}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border-2 border-foreground bg-background p-4">
                <div className="h-14 rounded-lg border border-border bg-surface" />
                <p className="mt-3 text-xs font-medium">Terminal Black</p>
                <p className="text-[11px] text-muted-foreground">Active</p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4 opacity-50">
                <div className="h-14 rounded-lg border border-border-strong bg-surface-2" />
                <p className="mt-3 text-xs font-medium">Graphite</p>
                <p className="text-[11px] text-muted-foreground">Coming soon</p>
              </div>
            </div>
            <Row title="Compact density" description="Tighter spacing across tables and cards." />
            <Row title="Monospace numerics" description="Tabular figures for all prices." defaultChecked />
          </div>
        </Panel>

        <Panel title="Notifications" action={<Bell className="h-4 w-4 text-muted-foreground" />}>
          <Row title="Price alerts" description="Level taps on tracked instruments." defaultChecked />
          <Row title="Session alerts" description="Open and close of Asia, London, New York." defaultChecked />
          <Row title="Economic news" description="High impact releases only." defaultChecked />
          <Row title="AI reminders" description="Journal prompts and behavioural nudges." />
          <Row title="Email digest" description="Daily summary at 21:00." />
        </Panel>

        <Panel title="API keys" subtitle="Placeholder only — nothing is stored" action={<KeyRound className="h-4 w-4 text-muted-foreground" />}>
          <div className="space-y-3">
            {["Market data provider", "Broker connection", "AI model provider"].map((k) => (
              <div key={k} className="space-y-1.5">
                <Label className="label-xs">{k}</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="•••• •••• •••• ••••"
                    className="border-border bg-surface"
                  />
                  <button className="shrink-0 rounded-lg border border-border-strong px-3 text-xs transition-colors hover:bg-surface-2">
                    Save
                  </button>
                </div>
              </div>
            ))}
            <p className="text-[11px] text-muted-foreground">
              Keys are not persisted in this build. Connect a secure backend before entering real
              credentials.
            </p>
          </div>
        </Panel>

        <Panel title="AI preferences" action={<Bot className="h-4 w-4 text-muted-foreground" />}>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="label-xs">Response style</Label>
              <Select defaultValue="analyst">
                <SelectTrigger className="border-border bg-surface">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analyst">Institutional analyst</SelectItem>
                  <SelectItem value="coach">Direct coach</SelectItem>
                  <SelectItem value="brief">Minimal and brief</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="label-xs">Standing instructions</Label>
              <Textarea
                className="min-h-24 border-border bg-surface text-sm"
                defaultValue={
                  "Only discuss XAU/USD, XAG/USD and DXY. Always state invalidation levels. Never suggest positions inside a high-impact news window."
                }
              />
            </div>
            <Row title="Use journal history" description="Let RONO reference past trades." defaultChecked />
            <Row title="Proactive briefings" description="Send a briefing at each session open." defaultChecked />
          </div>
        </Panel>

        <Panel title="Security" action={<Shield className="h-4 w-4 text-muted-foreground" />}>
          <div className="space-y-4">
            <Row title="Two-factor authentication" description="Authenticator app required at sign-in." defaultChecked />
            <Row title="Session timeout" description="Lock the workspace after 30 minutes idle." />
            <div className="rounded-lg border border-border bg-surface p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs">Active sessions</p>
                <Chip variant="outline">2 devices</Chip>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                MacBook Pro · London · last active now
              </p>
            </div>
            <button className="w-full rounded-lg border border-border-strong px-3 py-2 text-xs font-medium transition-colors hover:bg-surface-2">
              Sign out of all devices
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
