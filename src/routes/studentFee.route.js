import express from "express";
import * as feeController from "../controllers/fee.controller.js";

const router = express.Router();

router.post("/create", feeController.createStudentFee);
router.post("/payment", feeController.addPayment);

export default router;