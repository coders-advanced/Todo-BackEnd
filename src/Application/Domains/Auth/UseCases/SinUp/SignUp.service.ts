import { PayloadType } from "../../../../../@types/payload";
import { UserRepositoryContract } from "../../../../../Infra/Repository/Contracts/UserRepository.contract";
import { CustomerErrorResponse } from "../../../../../utils/custom-error-response";
import { signJWTToken } from "../../../../../utils/jsonWebToken";
import { UserEntity } from "../../../../Entities/UserEntity";
import { SignUpSchema, SignUpSchemaType } from "./core/sinUp.schema";

export class SignUpService {
  constructor(private readonly userRepository: UserRepositoryContract) {}

  async execute({ name, email, password }: SignUpSchemaType) {
    await this.validations({ name, email, password });

    const userCreated = await this.creation({ name, email, password });

    return this.response(userCreated);
  }

  private async validations({ name, email, password }: SignUpSchemaType) {
    const validateDTO = SignUpSchema.safeParse({ name, email, password });

    if (!validateDTO.success) {
      throw new CustomerErrorResponse(validateDTO.error.message, 400);
    }

    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new CustomerErrorResponse("email is already in used", 401);
    }
  }

  private async creation({ name, email, password }: SignUpSchemaType) {
    const userEntity = new UserEntity({ name, email, password });

    return this.userRepository.create(userEntity);
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
