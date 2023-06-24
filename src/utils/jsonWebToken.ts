import JWT, { SignOptions, JwtPayload } from "jsonwebtoken";
import { CustomerErrorResponse } from "./custom-error-response";

export const signJWTToken = (
  payload: string | object | Buffer,
  options?: SignOptions
) => {
  return JWT.sign(payload, process.env.JWT_SECRET, options);
};

export const verifyJWTToken = (token: string): JwtPayload | string => {
  try {
    return JWT.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new CustomerErrorResponse("unauthorized", 401);
  }
};
