import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function RegisterForm() {
  return (
    <form className="flex flex-col space-y-4">
      <Input name="email" type="email" placeholder="john@example.com" />
      <Input name="password" type="password" placeholder="*****" />
      <Input name="confirm" type="password" placeholder="*****" />
      <Button>LOGIN</Button>
    </form>
  );
}
