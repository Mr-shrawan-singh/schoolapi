import { z } from "zod";

export const createClassSchema = z.object({
  name: z.string().min(1),
  section: z.string().optional(),
  subjectIds: z.array(z.number()).optional(), // 🔥 IMPORTANT
});