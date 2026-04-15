import { z } from "zod";

// CREATE
export const createStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().email("Invalid email").optional(),

  phone: z.string().min(10, "Phone must be at least 10 digits"),

  address: z.string().min(1, "Address is required"),

 aadhar: z
  .string()
  .transform((val) => val.replace(/\s/g, ""))
  .refine((val) => /^\d{12}$/.test(val), {
    message: "Aadhar must be exactly 12 digits",
  }),

  admissionDate: z.string().optional(),
});


// UPDATE
export const updateStudentSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  address: z.string().optional(),
  aadhar: z.string().length(12).optional(),
  leavingDate: z.string().optional(),
});