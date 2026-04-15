import * as service from "../services/studentAcademic.service.js";
import { sendResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination, getPagingData } from "../utils/pagination.js";
import { da } from "zod/locales";


// ✅ CREATE
export const createAcademic = asyncHandler(async (req, res) => {
  const data = await service.createAcademic({
    ...req.body,
    startDate: new Date(),
    schoolId: req.user.schoolId,

  });

  sendResponse({
    res,
    status: 201,
    message: "Academic record created",
    data,
  });
});


// ✅ GET ALL
export const getAcademic = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);

  const { count, rows } = await service.getAllAcademic(
    req.user.schoolId,
    limit,
    offset
  );

  const { pagination } = getPagingData(count, rows, page, limit);

  sendResponse({
    res,
    message: "Academic records fetched",
    data: rows,
    pagination,
  });
});


// ✅ GET BY ID
export const getAcademicById = asyncHandler(async (req, res) => {
  const data = await service.getAcademicById(
    req.params.id,
    req.user.schoolId
  );

  if (!data) {
    const error = new Error("Academic record not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Academic record fetched",
    data,
  });
});


// ✅ UPDATE
export const updateAcademic = asyncHandler(async (req, res) => {
  const data = await service.updateAcademic(
    req.params.id,
    req.user.schoolId,
    req.body
  );

  if (!data) {
    const error = new Error("Academic record not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Academic record updated",
    data,
  });
});


// ✅ DELETE
export const deleteAcademic = asyncHandler(async (req, res) => {
  const deleted = await service.deleteAcademic(
    req.params.id,
    req.user.schoolId
  );

  if (!deleted) {
    const error = new Error("Academic record not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Academic record deleted",
  });
});


// ✅ PROMOTE / FAIL
export const promoteStudent = asyncHandler(async (req, res) => {
  const data = await service.promoteStudent({
    ...req.body,
    schoolId: req.user.schoolId,
  });

  sendResponse({
    res,
    message: "Student promoted/updated successfully",
    data,
  });
});