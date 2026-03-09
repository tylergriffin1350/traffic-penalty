import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const userRegistrationSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^(09|07)\d{8}$/,
      "Phone number must start with 09 or 07 and be 10 digits long."
    ),
  password: z.string().min(8),
  roleId: z.string().uuid(),
});

export const userLoginSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^(09|07)\d{8}$/,
      "Phone number must start with 09 or 07 and be 10 digits long."
    ),
  password: z.string().min(8),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  phoneNumber: z
    .string()
    .regex(
      /^(09|07)\d{8}$/,
      "Phone number must start with 09 or 07 and be 10 digits long."
    ),
  roles: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
  ),
});
