import { RegisterForm } from "./register-form";
import { AuthCard } from "./auth-card";

export function RegisterCard({
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
      footer="Already have an account?"
      footerLink="/auth/login"
    >
      <div>
        <RegisterForm />
      </div>
    </AuthCard>
  );
}
