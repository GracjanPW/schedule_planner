import { RegisterCard } from "@/components/auth/register-card";

export default function RegisterPage() {
  return (
    <RegisterCard
      modal={false}
      title={"Register"}
      description="create an account"
    />
  );
}
