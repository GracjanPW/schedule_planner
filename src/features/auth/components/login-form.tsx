import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  return (
    <form className="flex flex-col space-y-4 w-full">
      <Input type="email" placeholder="john@example.com" />
      <Input type="password" placeholder="*****" />
      <Button>Login</Button>
    </form>
  );
}
