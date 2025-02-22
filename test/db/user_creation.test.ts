import { describe, expect, test } from "bun:test";
import { CreateUser, FindUserByEmail, RemoveUserByEmail } from "@/db/user";

describe("User Creation", () => {
  test("should create a user", async () => {
    const userResult = await CreateUser({
      email: "test@example.com",
      password: "password1",
    });
    expect(userResult).toHaveProperty("email", "test@example.com");
    expect(userResult).toHaveProperty("password", "password1");
  });

  test("should find a user by email", async () => {
    const user = await FindUserByEmail("test@example.com");
    expect(user).toHaveProperty("email", "test@example.com");
  });
  test("should not create a user if email already exists", async () => {
    const user = await CreateUser({
      email: "test@example.com",
      password: "password2",
    });
    expect(user).toBeUndefined();
  });
  test("should remove a user", async () => {
    const user = await RemoveUserByEmail("test@example.com");
    expect(user).toBe(1);
  });
});
