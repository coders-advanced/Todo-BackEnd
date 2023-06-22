import { Response } from "express";
import { CustomerErrorResponse } from "./custom-error-response";

export const errorHandling = (
  response: Response,
  error: CustomerErrorResponse | Error | unknown
): Response => {
  if (error instanceof CustomerErrorResponse)
    return response
      .status(error.getStatusCode())
      .json(error.getObjectToResponse());

  console.log(error);
  return response
    .status(500)
    .json({ statusCode: 500, message: "internal server error" });
};
