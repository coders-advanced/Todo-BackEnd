import { describe, it, beforeEach, expect } from "vitest";
import { userRepositoryInMemorySingleton } from "../../../../../../Infra/Repository/Repositories/Singleton";
import { SignInSchema, SignInSchemaType } from "../core/signIn.schema";
import { SignInService } from "../SignIn.service";
import { CustomerErrorResponse } from "../../../../../../utils/custom-error-response";
import { SignUpService } from "../../SinUp/SignUp.service";

const userRepository = userRepositoryInMemorySingleton;
const sinInService = new SignInService(userRepository);
const sinUpService = new SignUpService(userRepository);

describe("sinup teste", () => {
  beforeEach(() => {
    userRepository.clearRepository();
  });

  it("is possible to login a user that exist", async () => {
    const userDTO: SignInSchemaType = {
      email: "jhon@gmail.com",
      password: "jhon12345",
    };

    await sinUpService.execute({ name: "jhon", ...userDTO });

    const result = await sinInService.execute(userDTO);

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("user");
    expect(result.user).toHaveProperty("id");
    expect(result.user.email).toBe(userDTO.email);
  });

  it("unable to login a user that already not exist", async () => {
    const userDTO: SignInSchemaType = {
      email: "jhon@gmail.com",
      password: "jhon12345",
    };

    expect(async () => await sinInService.execute(userDTO)).rejects.toThrow(
      new CustomerErrorResponse("user not found", 404)
    );
  });
});
