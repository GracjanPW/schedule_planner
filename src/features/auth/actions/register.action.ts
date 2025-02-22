"use server";

import { registerationSchema } from "../schema";

export default async function (
  prevState: any,
  formData: FormData,
): Promise<{
  errors?: any;
  message?: {
    type: string;
    text: string;
  };
}> {
  console.log({ formData, prevState });
  const validatedData = registerationSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  console.log(validatedData);
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: { type: "error", text: "Invalid data" },
    };
  }

  console.log(validatedData.data);
  return {
    message: {
      type: "success",
      text: "Registration successful",
    },
  };
}
