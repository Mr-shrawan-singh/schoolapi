import * as FeeController from "../controllers/feeType.controller.js";
import express from "express";
import { validate } from "../middlewares/validate.js";
import { createFeeTypeSchema ,updateFeeTypeSchema} from "../validations/feeType.validation.js";
const router = express.Router();

// CREATE
router.post("/", validate(createFeeTypeSchema), FeeController.createFeeType);

// GET ALL (filter: ?schoolId=1)
router.get("/", FeeController.getFeeTypes);
// GET BY ID
router.get("/:id", FeeController.getFeeType);
// UPDATE
router.put("/:id", validate(updateFeeTypeSchema), FeeController.updateFeeType);
// DELETE
router.delete("/:id", FeeController.deleteFeeType);
export default router;
