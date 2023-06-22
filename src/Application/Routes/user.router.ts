import { Router } from "express";
import { createUserController } from "../Domains/User/UsesCases/Create/CreateUser.factory";

const userRouter = Router();

userRouter.post("/", (request, response) => {
  createUserController.handle(request, response);
});

export default userRouter;
