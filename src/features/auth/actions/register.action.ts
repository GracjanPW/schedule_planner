"use server";

import { CreateUser, FindUserByEmail } from "@/db/user";
import { registerationSchema } from "../schema";
import { hash } from "bcryptjs";

export default async function (
  _prevState: any,
  formData: FormData,
): Promise<{
  errors?: any;
  message?: {
    type: string;
    text: string;
  };
}> {
  const validatedData = registerationSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: { type: "error", text: "Invalid data" },
    };
  }

  const { email, password } = validatedData.data;

  // Save user to database
  const existingUser = await FindUserByEmail(email);
  if (existingUser) {
    return {
      errors: {
        email: "User already exists",
      },
      message: {
        type: "error",
        text: "User already exists",
      },
    };
  }
  if (existingUser === undefined) {
    return {
      message: {
        type: "error",
        text: "An error occurred, please try again",
      },
    };
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await CreateUser({
    email,
    password: hashedPassword,
  });

  if (!newUser) {
    return {
      message: {
        type: "error",
        text: "An error occurred, please try again",
      },
    };
  }
  return {
    message: {
      type: "success",
      text: "Registration successful",
    },
  };
}
