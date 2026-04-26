import express from "express";
import * as Controller from "../controllers/feeManagement.controller.js";

const router = express.Router();

// Student Fee
router.post("/", Controller.createStudentFee);
router.get("/", Controller.getStudentFees);
router.get("/:id", Controller.getStudentFee);
router.delete("/:id", Controller.deleteStudentFee);

// Payment
router.post("/payment", Controller.makePayment);

export default router;