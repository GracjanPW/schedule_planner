"use server";

import { FindUserByEmail } from "@/db/user";
import { loginSchema } from "../schema";
import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { CreateSession } from "@/db/session";

export default async function LoginAction(
  _prevState: any,
  formData: FormData,
): Promise<{
  message?: {
    text: string;
    type: string;
  };
  errors?: any;
}> {
  const validatedData = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (validatedData.error) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: { type: "error", text: "Invalid data" },
    };
  }

  const { email, password } = validatedData.data;
  const user = await FindUserByEmail(email);
  if (!user) {
    return {
      message: {
        type: "error",
        text: "Either password or email is incorrect",
      },
    };
  }
  const match = await compare(password, user.password);
  if (!match) {
    return {
      message: {
        type: "error",
        text: "Either password or email is incorrect",
      },
    };
  }

  const cookieStore = await cookies();
  const uuid = uuidv4();

  const session = await CreateSession(uuid, user.id);

  if (!session) {
    return {
      message: {
        type: "error",
        text: "Something went wrong, try again",
      },
    };
  }
  const COOKIE_NAME = process.env.SESSION_COOKIE;
  if (!COOKIE_NAME) throw new Error("SESSION_COOKIE env var not set");

  cookieStore.set(COOKIE_NAME, session.uuid, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/");
}
