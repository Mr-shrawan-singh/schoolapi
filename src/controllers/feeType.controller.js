import * as FeeService from "../services/feeType.service.js";
import { sendResponseRSSMDP,sendResponseW } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination, getPaginationResponsecpl } from "../utils/pagination.js";



// CREATE
export const createFeeType = asyncHandler(async (req, res) => {
  const data = await FeeService.createFeeType({...req.body, schoolId: req.user.schoolId});
  sendResponseW(res,201,true,"Fee type created successfully", data);
});

// GET ALL
export const getFeeTypes = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);

  const { search = "", sortBy = "createdAt", order = "DESC" } = req.query;

  const { count, data } = await FeeService.getFeeTypes(
    limit,
    offset,
    req.user.schoolId,
    search,
    sortBy,
    order
  );

  const pagination = getPaginationResponsecpl(count, page, limit);

  sendResponseRSSMDP(res, 200, true, "Fee types fetched", data, pagination);
});

// GET BY ID
export const getFeeType = asyncHandler(async (req, res) => {
  const data = await FeeService.getFeeTypeById(req.params.id);
  if (!data) throw new Error("Fee type not found");
  sendResponseW(res,200,true,"Fee type fetched", data);
});

// UPDATE
export const updateFeeType = asyncHandler(async (req, res) => {
  const data = await FeeService.updateFeeType(req.params.id, req.body);
  if (!data) throw new Error("Fee type not found");
  sendResponseW(res,200,true,"Fee type updated", data);
});

// DELETE
export const deleteFeeType = asyncHandler(async (req, res) => {
  const data = await FeeService.deleteFeeType(req.params.id);
    if (!data) throw new Error("Fee type not found");
    sendResponseW(res,200,true,"Fee type deleted", data);
});


