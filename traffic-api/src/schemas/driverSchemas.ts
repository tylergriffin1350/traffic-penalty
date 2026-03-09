import { z } from "zod";

export const createDriverSchema = z.object({
  name: z.string().min(1),
  phoneNumber: z
    .string()
    .regex(
      /^(09|07)\d{8}$/,
      "Phone number must start with 09 or 07 and be 10 digits long."
    ),
  licenseNumber: z.string().min(1),
});
