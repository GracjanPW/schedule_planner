import { RegisterCard } from "@/features/auth/components/register-card";

export default function RegisterPage() {
  return (
    <RegisterCard
      modal={false}
      title={"Register"}
      description="create an account"
    />
  );
}
