import { LoginCard } from "@/features/auth/components/login-card";

export default async function Default(props: {
  params: Promise<{
    catch: string[];
  }>;
}) {
  const params = await props.params;
  console.log(params);
  if (params.catch[0] === "auth") return null;
  return (
    <LoginCard
      modal={true}
      title="You're session expired"
      description="Log back in to continue"
    />
  );
}
