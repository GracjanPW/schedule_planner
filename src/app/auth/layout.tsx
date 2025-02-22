export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-primary/10 h-full">{children}</div>;
}
