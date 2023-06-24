import type { Request, Response } from "express";
import { errorHandling } from "../../../../../utils/error-handling";
import { SignInService } from "./SignIn.service";

export class SignInController {
  constructor(private readonly sinUpService: SignInService) {}

  async handle(request: Request, response: Response) {
    const user = request.body.user;

    if (!user)
      return response
        .status(400)
        .json({ statuscode: 400, message: "required user object" });

    try {
      const result = await this.sinUpService.execute(user);

      return response.status(201).json(result);
    } catch (error) {
      return errorHandling(response, error);
    }
  }
}
