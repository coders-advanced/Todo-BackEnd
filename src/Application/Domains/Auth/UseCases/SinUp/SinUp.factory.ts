import { UserPrismaRepository } from "../../../../../Infra/Repository/Repositories/User.repository";
import { SignUpController } from "./SignUp.controller";
import { SignUpService } from "./SignUp.service";

export const signUpController = new SignUpController(
  new SignUpService(new UserPrismaRepository())
);
