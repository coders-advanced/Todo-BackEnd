import type { Request, Response } from "express";
import { errorHandling } from "../../../../../utils/error-handling";
import { SignUpService } from "./SignUp.service";

export class SignUpController {
  constructor(private readonly sinUpService: SignUpService) {}

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
