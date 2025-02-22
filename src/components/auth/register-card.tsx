import { RegisterForm } from "./register-form";
import { AuthCard } from "./auth-card";
import Link from "next/link";

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
      footer={
        <p>
          Have an account already?&nbsp;
          <Link href="/auth/login" className="text-blue-600">
            login
          </Link>
        </p>
      }
    >
      <div>
        <RegisterForm />
      </div>
    </AuthCard>
  );
}
