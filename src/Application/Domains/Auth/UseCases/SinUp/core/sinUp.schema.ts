import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().nonempty().max(50),
  email: z.string().email().nonempty().max(50),
  password: z
    .string()
    .nonempty()
    .min(6, { message: "requires a minimum of 6 characters in the password" })
    .max(50),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
