"use client";

import { FormStatus } from "@/components/form/form-message";
import { InputField } from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import loginAction from "../actions/login.action";

const initialState = {
  message: undefined,
  errors: {},
};

export function LoginForm() {
  const [status, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  const [email, setEmail] = useState("");
  return (
    <form className="flex flex-col space-y-4 w-full" action={formAction}>
      <InputField
        name="email"
        label="Email"
        placeholder="johndoe@example.com"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        error={status?.errors?.email}
      />
      <InputField
        name="password"
        label="Password"
        placeholder="Password"
        type="password"
        error={status?.errors?.password}
      />
      <FormStatus message={status.message} />
      <Button variant={"auth"} type="submit" disabled={pending}>
        Login
      </Button>
    </form>
  );
}
