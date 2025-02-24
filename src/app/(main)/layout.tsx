import { Auth } from "@/features/auth";
import { DashboardHeader } from "@/components/dashboard-header";

export default async function Layout({
  auth,
  children,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  const session = await Auth();
  return (
    <>
      <DashboardHeader />
      {children}
      {!session && auth}
    </>
  );
}
