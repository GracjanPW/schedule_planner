import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
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
      footer={
        <p>
          Don&apos;t have an account?&nbsp;
          <Link href="/auth/register" className="text-blue-600">
            Register
          </Link>
        </p>
      }
    >
      <div className="w-full">
        <LoginForm />
      </div>
    </AuthCard>
  );
}
