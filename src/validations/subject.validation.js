import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().min(1, "Name is required"),

  code: z.string().optional(),

  description: z.string().optional(),
});