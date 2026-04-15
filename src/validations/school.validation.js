import { z } from "zod";

export const createSchoolSchema = z.object({
  // Mandatory
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(1),
  // Optional
  principalName: z.string().optional(),
  establishedYear: z.string().optional(),
  board: z.string().optional(),
  website: z.string().optional(),
});

export const updateSchoolSchema = createSchoolSchema.partial();