import { PayloadType } from "../../../../../@types/payload";
import { UserRepositoryContract } from "../../../../../Infra/Repository/Contracts/UserRepository.contract";
import { CustomerErrorResponse } from "../../../../../utils/custom-error-response";
import { signJWTToken } from "../../../../../utils/jsonWebToken";
import { UserEntity } from "../../../../Entities/UserEntity";
import { SignInSchema, SignInSchemaType } from "./core/signIn.schema";
import bcrypt from "bcrypt";

export class SignInService {
  constructor(private readonly userRepository: UserRepositoryContract) {}

  async execute({ email, password }: SignInSchemaType) {
    const userEntity = await this.validations({ email, password });

    return this.response(userEntity);
  }

  private async validations({ email, password }: SignInSchemaType) {
    const validateDTO = SignInSchema.safeParse({ email, password });

    if (!validateDTO.success) {
      throw new CustomerErrorResponse(validateDTO.error.message, 400);
    }

    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new CustomerErrorResponse("user not found", 404);
    }

    const passwordIsValid = bcrypt.compareSync(password, userExist.password);

    if (!passwordIsValid) {
      throw new CustomerErrorResponse("password is invalid", 404);
    }

    return userExist;
  }

  private async response(userEntity: UserEntity) {
    const payload: PayloadType = {
      sub: userEntity.id,
    };

    return {
      token: signJWTToken(payload),
      user: {
        id: userEntity.id,
        name: userEntity.name,
        email: userEntity.email,
      },
    };
  }
}
