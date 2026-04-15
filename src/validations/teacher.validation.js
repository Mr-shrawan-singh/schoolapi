import { z } from "zod";

export const createTeacherSchema = z.object({
  name: z.string().min(1),

  email: z.string().email(),

  phone: z.string().min(10),

  qualification: z.string().optional(),

  experience: z.string().optional(),
});