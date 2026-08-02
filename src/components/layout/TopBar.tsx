import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { alerts } from "@/lib/mock-data";
import { StatusDot } from "@/components/common/StatusDot";
import { useAuth } from "@/contexts/AuthContext";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function initials(name: string): string {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?"
  );
}

export function TopBar() {
  const now = useClock();
  const unread = alerts.filter((a) => a.unread).length;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate({ to: "/login" });
  }

  return (
    <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
      <div className="flex shrink-0 items-center gap-3">
        <SidebarTrigger className="text-muted-foreground" />
        <span className="hidden text-sm font-semibold tracking-tight sm:inline">
          RONO <span className="text-muted-foreground">Terminal</span>
        </span>
      </div>

      <div className="relative min-w-0">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search instruments, trades, notes…"
          className="h-9 w-full border-border bg-surface pl-9 text-sm placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="hidden text-right lg:block">
          <p className="num text-xs font-medium">
            {now ? now.toLocaleTimeString("en-GB", { hour12: false }) : "--:--:--"}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {now
              ? now.toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : ""}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground">
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="num absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {unread}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="label-xs">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {alerts.slice(0, 4).map((a) => (
              <DropdownMenuItem key={a.id} className="flex-col items-start gap-1 py-2">
                <span className="text-xs font-medium">{a.title}</span>
                <span className="text-[11px] text-muted-foreground">{a.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 rounded-lg border border-border bg-surface px-2 py-1.5 text-left transition-colors hover:bg-surface-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-secondary text-[11px] font-semibold">
              {initials(user?.display_name ?? "")}
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-xs font-medium">
                {user?.display_name ?? "..."}
              </span>
              <span className="block truncate text-[10px] text-muted-foreground">Solo trader</span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <StatusDot tone="active" label="Session active" />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
