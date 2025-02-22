import { LoginForm } from "@/features/auth/components/login-form";
import { AuthCard } from "./auth-card";

export function LoginCard({
  modal = false,
  title,
  description,
}: {
  modal: boolean;
  title: string;
  description: string;
}) {
  return (
    <AuthCard
      modal={modal}
      title={title}
      description={description}
      footer="Don't have an account?"
      footerLink="/auth/register"
    >
      <div className="w-full">
        <LoginForm />
      </div>
    </AuthCard>
  );
}
