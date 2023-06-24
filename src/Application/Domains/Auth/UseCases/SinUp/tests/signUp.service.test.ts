import { describe, it, beforeEach, expect } from "vitest";
import { userRepositoryInMemorySingleton } from "../../../../../../Infra/Repository/Repositories/Singleton";
import { SignUpSchemaType } from "../core/sinUp.schema";
import { SignUpService } from "../SignUp.service";
import { CustomerErrorResponse } from "../../../../../../utils/custom-error-response";

const userRepository = userRepositoryInMemorySingleton;
const sinUpService = new SignUpService(userRepository);

describe("sinup teste", () => {
  beforeEach(() => {
    userRepository.clearRepository();
  });

  it("is possible to create a user that doesn't exist", async () => {
    const userDTO: SignUpSchemaType = {
      name: "jhon",
      email: "jhon@gmail.com",
      password: "jhon12345",
    };

    const result = await sinUpService.execute(userDTO);

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("user");
    expect(result.user).toHaveProperty("id");
    expect(result.user.name).toBe(userDTO.name);
    expect(result.user.email).toBe(userDTO.email);
  });

  it("unable to create a user that already exist", async () => {
    const userDTO: SignUpSchemaType = {
      name: "jhon",
      email: "jhon@gmail.com",
      password: "jhon12345",
    };

    await sinUpService.execute(userDTO);

    expect(async () => await sinUpService.execute(userDTO)).rejects.toThrow(
      new CustomerErrorResponse("email is already in used", 401)
    );
  });
});
