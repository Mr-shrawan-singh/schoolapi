import zod from "zod";

export const createFeeStructureDetailSchema = zod.object({
  feeStructureId: zod.number().int().positive(),
  feeTypeId: zod.number().int().positive(),
  amount: zod.number().positive("Amount must be positive"),
  label: zod.string().optional(),
});

export const updateFeeStructureDetailSchema = zod.object({
  feeStructureId: zod.number().int().positive().optional(),
  feeTypeId: zod.number().int().positive().optional(),
  amount: zod.number().positive().optional(),
  label: zod.string().optional(),
});