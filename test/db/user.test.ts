import { describe, expect, test } from "bun:test";
import {
  CreateUser,
  FindUserByEmail,
  FindUserSessionBySessionId,
  RemoveUserByEmail,
} from "@/db/user";
import { v4 as uuidv4 } from "uuid";
import { CreateSession, DeleteSession } from "@/db/session";

describe("User Registration", () => {
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
});
let uuid = uuidv4();
describe("User Login", () => {
  test("should create a database session", async () => {
    const user = await FindUserByEmail("test@example.com");
    expect(user).toContainKey("id");
    const session = await CreateSession(uuid, user!.id);
    expect(session).toHaveProperty("uuid", uuid);
  });
  test("should retrieve session with uuid", async () => {
    const user = await FindUserByEmail("test@example.com");
    const session = await FindUserSessionBySessionId(uuid);
    expect(session).toHaveProperty("id", user?.id);
    expect(session).toHaveProperty("email", user?.email);
  });
});

describe("User Logout", () => {
  test("should remove users session from database", async () => {
    const session = await DeleteSession(uuid);
    expect(session).toBe(1);
  });

  test("should remove a user", async () => {
    const user = await RemoveUserByEmail("test@example.com");
    expect(user).toBe(1);
  });
});
