import * as Service from "../services/feeManagement.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  sendResponseW,
  sendResponseRSSMDP,
} from "../utils/response.js";
import {
  getPagination,
  getPaginationResponsecpl,
} from "../utils/pagination.js";

// CREATE STUDENT FEE
export const createStudentFee = asyncHandler(async (req, res) => {

  const data = await Service.createStudentFee({...req.body,schoolId: req.user.schoolId});
  sendResponseW(res, 201, true, "Student fee created", data);
});

// MAKE PAYMENT
export const makePayment = asyncHandler(async (req, res) => {
  const data = await Service.makePayment({...req.body,schoolId: req.user.schoolId});
  sendResponseW(res, 201, true, "Payment successful", data);
});

// GET ALL
export const getStudentFees = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);

  const { count, data } = await Service.getStudentFees(
    limit,
    offset
  );

  const pagination = getPaginationResponsecpl(
    count,
    page,
    limit
  );

  sendResponseRSSMDP(
    res,
    200,
    true,
    "Student fees fetched",
    data,
    pagination
  );
});

// GET ONE
export const getStudentFee = asyncHandler(async (req, res) => {
  const data = await Service.getStudentFeeById(req.params.id);

  if (!data) throw new Error("Not found");

  sendResponseW(res, 200, true, "Fetched", data);
});

// DELETE
export const deleteStudentFee = asyncHandler(async (req, res) => {
  const data = await Service.deleteStudentFee(req.params.id);

  if (!data) throw new Error("Not found");

  sendResponseW(res, 200, true, "Deleted", data);
});