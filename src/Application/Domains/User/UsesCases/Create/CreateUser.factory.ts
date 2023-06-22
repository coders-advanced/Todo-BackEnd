import { CreateUserController } from "./CreateUser.controller";
import { CreateUserService } from "./CreateUser.service";

export const createUserController = new CreateUserController(
  new CreateUserService()
);
