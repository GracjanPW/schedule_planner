import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function LoginForm() {
  return (
    <form className="flex flex-col space-y-4 w-full">
      <Input type="email" placeholder="john@example.com" />
      <Input type="password" placeholder="*****" />
      <Button>LOGIN</Button>
    </form>
  );
}
