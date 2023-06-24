import { describe, it, beforeEach, expect } from "vitest";
import { SignInSchema, SignInSchemaType } from "../core/signIn.schema";

describe("sinUp dto test", () => {
  it("not able create a new user with data valid", () => {
    const userDTO: SignInSchemaType = {
      email: "jhon@gmail.com",
      password: "jhon123",
    };

    const validateDTO = SignInSchema.safeParse(userDTO);
    expect(validateDTO.success).toBe(true);
  });

  it("not able login a new user with data valid", () => {
    const userDTO: SignInSchemaType = {
      email: "jhaon",
      password: "jhon123",
    };

    const validateDTO = SignInSchema.safeParse(userDTO);
    expect(validateDTO.success).toBe(false);

    if (!validateDTO.success) {
      expect(validateDTO.error.message).toBe(
        '[\n  {\n    "validation": "email",\n    "code": "invalid_string",\n    "message": "Invalid email",\n    "path": [\n      "email"\n    ]\n  }\n]'
      );
    }
  });

  it("it is not possible to login a new user with a password less than 6 characters", () => {
    const userDTO: SignInSchemaType = {
      email: "jhaon@gmail.com",
      password: "jhon",
    };

    const validateDTO = SignInSchema.safeParse(userDTO);
    expect(validateDTO.success).toBe(false);

    if (!validateDTO.success) {
      expect(validateDTO.error.message).toBe(
        '[\n  {\n    "code": "too_small",\n    "minimum": 6,\n    "type": "string",\n    "inclusive": true,\n    "exact": false,\n    "message": "requires a minimum of 6 characters in the password",\n    "path": [\n      "password"\n    ]\n  }\n]'
      );
    }
  });
});
