import zod from "zod";

export const createFeeStructureSchema = zod.object({
  classId: zod.number().int().positive("classId must be positive"),
  academicYear: zod.string().min(1, "Academic year is required"),
});

export const updateFeeStructureSchema = zod.object({
  classId: zod.number().int().positive().optional(),
  academicYear: zod.string().optional(),
});