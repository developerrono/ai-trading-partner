import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Bot,
  CandlestickChart,
  NotebookPen,
  FileBarChart,
  Bell,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { StatusDot } from "@/components/common/StatusDot";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "AI Partner", url: "/ai-partner", icon: Bot },
  { title: "Market", url: "/market", icon: CandlestickChart },
  { title: "Journal", url: "/journal", icon: NotebookPen },
  { title: "Reports", url: "/reports", icon: FileBarChart },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border-strong bg-surface-2 text-sm font-bold tracking-tight">
            R
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight">RONO</p>
              <p className="truncate text-[11px] text-muted-foreground">AI Trading Partner</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="label-xs">Workspace</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="truncate">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-4">
        {collapsed ? (
          <StatusDot tone="active" />
        ) : (
          <div className="rounded-lg border border-border bg-surface p-3">
            <StatusDot tone="active" label="RONO online" />
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              Monitoring 3 instruments · London session
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
