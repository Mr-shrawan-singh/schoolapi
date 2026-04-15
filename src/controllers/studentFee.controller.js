import * as feeService from "../services/fee.service.js";
import { sendResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createStudentFee = asyncHandler(async (req, res) => {
  const { studentAcademicId, feeStructureId } = req.body;

  const data = await feeService.createStudentFee(
    studentAcademicId,
    feeStructureId
  );

  sendResponse({
    res,
    message: "Student fee created",
    data,
  });
});

export const addPayment = asyncHandler(async (req, res) => {
  const { studentFeeId, amount } = req.body;

  const data = await feeService.addPayment(studentFeeId, amount);

  sendResponse({
    res,
    message: "Payment added",
    data,
  });
});