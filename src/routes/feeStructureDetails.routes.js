import express from "express";
import * as Controller from "../controllers/feeStructureDetail.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createFeeStructureDetailSchema,
  updateFeeStructureDetailSchema,
} from "../validations/feeStructureDetail.validation.js";

const router = express.Router();

// CREATE
router.post("/", validate(createFeeStructureDetailSchema), Controller.createFeeStructureDetail);

// GET ALL
router.get("/", Controller.getFeeStructureDetails);

// GET BY ID
router.get("/:id", Controller.getFeeStructureDetail);

// UPDATE
router.put("/:id", validate(updateFeeStructureDetailSchema), Controller.updateFeeStructureDetail);

// DELETE
router.delete("/:id", Controller.deleteFeeStructureDetail);

export default router;