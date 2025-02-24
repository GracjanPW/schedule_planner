import { LoginCard } from "@/features/auth/components/login-card";

export default function LoginPage() {
  return (
    <LoginCard
      modal={false}
      title={"Welcome"}
      description="sign in to schedule"
    />
  );
}
