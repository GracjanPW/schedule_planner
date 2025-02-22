import { LoginCard } from "@/components/auth/login-card";

export default function LoginPage() {
  return (
    <LoginCard
      modal={false}
      title={"Welcome"}
      description="sign in to schedule"
    />
  );
}
