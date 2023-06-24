import { UserPrismaRepository } from "../../../../../Infra/Repository/Repositories/User.repository";
import { SignInController } from "./SignIn.controller";
import { SignInService } from "./SignIn.service";

export const signInController = new SignInController(
  new SignInService(new UserPrismaRepository())
);
