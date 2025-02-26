import { Auth } from "@/features/auth";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSideNav } from "@/components/dashboard-side-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

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
      </SidebarProvider>
      {!session && auth}
    </div>
  );
}
