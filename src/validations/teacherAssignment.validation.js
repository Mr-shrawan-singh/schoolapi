import { z } from "zod";

export const createAssignmentSchema = z.object({
  teacherId: z.number(),
  assignments: z.array(
    z.object({
      classId: z.number(),
      subjectId: z.number(),
    })
  ),
});