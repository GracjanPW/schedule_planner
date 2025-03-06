import { Auth } from "@/features/auth";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSideNav } from "@/components/dashboard-side-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CalendarDayModal } from "@/features/calendar/components/calendar-day-modal";
import { AddCalendarEventModal } from "@/features/calendar/components/add-calendar-event-modal";

export default async function Layout({
  auth,
  children,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  const session = await Auth();
  return (
    <div className="">
      <SidebarProvider>
        <DashboardSideNav />
        <main className="w-full">
          <DashboardHeader />

          {children}
        </main>
        <CalendarDayModal />
        <AddCalendarEventModal />
      </SidebarProvider>
      {!session && auth}
    </div>
  );
}
