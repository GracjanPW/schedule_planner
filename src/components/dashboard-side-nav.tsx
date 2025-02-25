import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, LayoutDashboard, type LucideIcon } from "lucide-react";
import Link from "next/link";

const MAIN_OPTIONS: {
  text: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    text: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    text: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
];

export function DashboardSideNav() {
  return (
    <Sidebar>
      <SidebarHeader>Scheduly</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_OPTIONS.map(({ text, href, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild>
                    <Link href={href}>
                      <Icon />
                      {text}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
