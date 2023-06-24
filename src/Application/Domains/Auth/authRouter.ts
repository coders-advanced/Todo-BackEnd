import { Router } from "express";
import { signUpController } from "./UseCases/SinUp/SinUp.factory";
import { signInController } from "./UseCases/SinIn/SignIn.factory";

const authRouter = Router();

authRouter.post("/signUp", (request, response) => {
  return signUpController.handle(request, response);
});

authRouter.post("/signIn", (request, response) => {
  return signInController.handle(request, response);
});

export { authRouter };
