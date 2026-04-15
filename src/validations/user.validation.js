import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 chars"),

  phone: z.string().min(10, "Phone must be at least 10 digits"),

  address: z.string().min(1, "Address is required"),

  aadhar: z.string().length(12, "Aadhar must be 12 digits"),

});