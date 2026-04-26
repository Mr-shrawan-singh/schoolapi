import * as Service from "../services/feeStructureDetail.service.js";
import { sendResponseRSSMDP, sendResponseW } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination, getPaginationResponsecpl } from "../utils/pagination.js";

// CREATE
export const createFeeStructureDetail = asyncHandler(async (req, res) => {
  const data = await Service.createFeeStructureDetail({...req.body,schoolId: req.user.schoolId});
  sendResponseW(res, 201, true, "Fee structure detail created", data);
});

// GET ALL
export const getFeeStructureDetails = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const {
    search = "",
    sortBy = "createdAt",
    order = "DESC",
    feeStructureId,
  } = req.query;

  const { count, data } = await Service.getFeeStructureDetails(
    limit,
    offset,
    feeStructureId,
    search,
    sortBy,
    order
  );

  const pagination = getPaginationResponsecpl(count, page, limit);

  sendResponseRSSMDP(
    res,
    200,
    true,
    "Fee structure details fetched",
    data,
    pagination
  );
});

// GET BY ID
export const getFeeStructureDetail = asyncHandler(async (req, res) => {
  const data = await Service.getFeeStructureDetailById(req.params.id);

  if (!data) throw new Error("Fee structure detail not found");

  sendResponseW(res, 200, true, "Fee structure detail fetched", data);
});

// UPDATE
export const updateFeeStructureDetail = asyncHandler(async (req, res) => {
  const data = await Service.updateFeeStructureDetail(
    req.params.id,
    req.body
  );

  if (!data) throw new Error("Fee structure detail not found");

  sendResponseW(res, 200, true, "Updated successfully", data);
});

// DELETE
export const deleteFeeStructureDetail = asyncHandler(async (req, res) => {
  const data = await Service.deleteFeeStructureDetail(req.params.id);

  if (!data) throw new Error("Fee structure detail not found");

  sendResponseW(res, 200, true, "Deleted successfully", data);
});