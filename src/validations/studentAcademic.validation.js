import { z } from "zod";

// CREATE (assign class)
export const createAcademicSchema = z.object({
  studentId: z.number(),

  classId: z.number(),

  academicYear: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Format must be YYYY-YY (e.g., 2010-11)"),

  startDate: z.string().optional(),

  subjectIds: z.array(z.number()).optional(), // 🔥 important
});


export const promoteStudentSchema = z.object({
  studentId: z.number(),

  currentAcademicId: z.number(),

  nextClassId: z.number().optional(),

  academicYear: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Format must be YYYY-YY"),
  subjectIds: z.array(z.number()).optional(),
  result: z.enum(["pass", "fail"]),
});