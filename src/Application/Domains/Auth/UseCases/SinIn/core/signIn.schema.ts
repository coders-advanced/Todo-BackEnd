import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email().nonempty().max(50),
  password: z
    .string()
    .nonempty()
    .min(6, { message: "requires a minimum of 6 characters in the password" })
    .max(50),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
