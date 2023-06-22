import { Request, Response } from "express";
import { errorHandling } from "../../../../../utils/error-handling";
import { CreateUserService } from "./CreateUser.service";

export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  handle(request: Request, response: Response): Response {
    let user;
    try {
      user = request.body.user;
    } catch {
      return response.status(400).send();
    }

    try {
      const result = this.createUserService.execute(user);
      return response.status(201).json(result);
    } catch (error) {
      return errorHandling(response, error);
    }
  }
}
