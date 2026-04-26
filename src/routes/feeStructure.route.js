import express from "express";
import * as FeeStructureController from "../controllers/feeStructure.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createFeeStructureSchema,
  updateFeeStructureSchema,
} from "../validations/feeStructure.validation.js";

const router = express.Router();

// CREATE
router.post("/", validate(createFeeStructureSchema), FeeStructureController.createFeeStructure);

// GET ALL
router.get("/", FeeStructureController.getFeeStructures);

// GET BY ID
router.get("/:id", FeeStructureController.getFeeStructure);

// UPDATE
router.put("/:id", validate(updateFeeStructureSchema), FeeStructureController.updateFeeStructure);

// DELETE
router.delete("/:id", FeeStructureController.deleteFeeStructure);

export default router;