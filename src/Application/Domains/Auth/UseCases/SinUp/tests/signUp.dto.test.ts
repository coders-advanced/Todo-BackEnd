import { describe, it, beforeEach, expect } from "vitest";
import { SignUpSchema, SignUpSchemaType } from "../core/sinUp.schema";

describe("sinUp dto test", () => {
  it("not able create a new user with data valid", () => {
    const userDTO: SignUpSchemaType = {
      name: "jhon",
      email: "jhon@gmail.com",
      password: "jhon123",
    };

    const validateDTO = SignUpSchema.safeParse(userDTO);
    expect(validateDTO.success).toBe(true);
  });

  it("not able create a new user with data valid", () => {
    const userDTO: SignUpSchemaType = {
      name: "jhon",
      email: "jhaon",
      password: "jhon123",
    };

    const validateDTO = SignUpSchema.safeParse(userDTO);
    expect(validateDTO.success).toBe(false);

    if (!validateDTO.success) {
      expect(validateDTO.error.message).toBe(
        '[\n  {\n    "validation": "email",\n    "code": "invalid_string",\n    "message": "Invalid email",\n    "path": [\n      "email"\n    ]\n  }\n]'
      );
    }
  });

  it("it is not possible to create a new user with a password less than 6 characters", () => {
    const userDTO: SignUpSchemaType = {
      name: "jhon",
      email: "jhaon@gmail.com",
      password: "jhon",
    };

    const validateDTO = SignUpSchema.safeParse(userDTO);
    expect(validateDTO.success).toBe(false);

    if (!validateDTO.success) {
      expect(validateDTO.error.message).toBe(
        '[\n  {\n    "code": "too_small",\n    "minimum": 6,\n    "type": "string",\n    "inclusive": true,\n    "exact": false,\n    "message": "requires a minimum of 6 characters in the password",\n    "path": [\n      "password"\n    ]\n  }\n]'
      );
    }
  });
});
