import zod from "zod";
export const createFeeTypeSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  description: zod.string().optional()
});


export const updateFeeTypeSchema = zod.object({
  name: zod.string().optional(),
  description: zod.string().optional()
});
