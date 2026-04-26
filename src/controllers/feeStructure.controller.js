import * as FeeStructureService from "../services/feeStructure.service.js";
import { sendResponseRSSMDP, sendResponseW } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination, getPaginationResponsecpl } from "../utils/pagination.js";

// CREATE
export const createFeeStructure = asyncHandler(async (req, res) => {
  const data = await FeeStructureService.createFeeStructure({
    ...req.body,
    schoolId: req.user.schoolId,
  });

  sendResponseW(res, 201, true, "Fee structure created", data);
});

// GET ALL
export const getFeeStructures = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { search = "", sortBy = "createdAt", order = "DESC" } = req.query;

  const { count, data } = await FeeStructureService.getFeeStructures(
    limit,
    offset,
    req.user.schoolId,
    search,
    sortBy,
    order
  );

  const pagination = getPaginationResponsecpl(count, page, limit);

  sendResponseRSSMDP(
    res,
    200,
    true,
    "Fee structures fetched",
    data,
    pagination
  );
});

// GET BY ID
export const getFeeStructure = asyncHandler(async (req, res) => {
  const data = await FeeStructureService.getFeeStructureById(req.params.id);

  if (!data) throw new Error("Fee structure not found");

  sendResponseW(res, 200, true, "Fee structure fetched", data);
});

// UPDATE
export const updateFeeStructure = asyncHandler(async (req, res) => {
  const data = await FeeStructureService.updateFeeStructure(
    req.params.id,
    req.body
  );

  if (!data) throw new Error("Fee structure not found");

  sendResponseW(res, 200, true, "Fee structure updated", data);
});

// DELETE
export const deleteFeeStructure = asyncHandler(async (req, res) => {
  const data = await FeeStructureService.deleteFeeStructure(req.params.id);

  if (!data) throw new Error("Fee structure not found");

  sendResponseW(res, 200, true, "Fee structure deleted", data);
});