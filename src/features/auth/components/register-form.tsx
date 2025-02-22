"use client";

import { FormStatus } from "@/components/form/form-message";
import { InputField } from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { RegisterAction } from "@/features/auth/actions";
import { useActionState, useState } from "react";

const initialState = {
  message: undefined,
  errors: {},
};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    RegisterAction,
    initialState,
  );
  const [email, setEmail] = useState(""); // persist email value after form submit
  return (
    <form className="flex flex-col space-y-4" action={formAction}>
      <InputField
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={state?.errors?.email}
      />
      <InputField
        name="password"
        label="New password"
        type="password"
        placeholder="New password"
        error={state?.errors?.password}
      />
      <InputField
        name="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="Confirm password"
        error={state?.errors?.confirm}
      />
      <FormStatus message={state.message} />
      <Button type="submit" disabled={pending} className="text-lg font-bold">
        Register
      </Button>
    </form>
  );
}
