import { LoginCard } from "@/components/auth/login-card";

export default async function Default() {
  return (
    <LoginCard
      modal={true}
      title="You're session expired"
      description="Log back in to continue"
    />
  );
}
