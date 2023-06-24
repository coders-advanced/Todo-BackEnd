import { Router } from "express";
import { createUserController } from "./UsesCases/Create/CreateUser.factory";

const userRouter = Router();

userRouter.post("/", (request, response) => {
  createUserController.handle(request, response);
});

export { userRouter };
