import * as subjectService from "../services/subject.service.js";
import { sendResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination, getPagingData } from "../utils/pagination.js";


// CREATE
export const createSubject = asyncHandler(async (req, res) => {
  const schoolId = req.user.schoolId;

  const subject = await subjectService.createSubject(req.body, schoolId);

  sendResponse({
    res,
    status: 201,
    message: "Subject created successfully",
    data: subject,
  });
});

// GET ALL (filter by schoolId)
export const getSubjects = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const { schoolId } = req.query;

  const { count, rows } = await subjectService.getAllSubjects(
    limit,
    offset,
    schoolId
  );

  const { pagination } = getPagingData(count, rows, page, limit);

  sendResponse({
    res,
    message: "Subjects fetched successfully",
    data: rows,
    pagination,
  });
});

export const getSubjectsByClassIds = asyncHandler(async (req, res) => {
  const { classId } = req.query;
  const classIds = classId
  ? classId.split(",").map(Number)
  : [];

  if (!Array.isArray(classIds) || classIds.length === 0) {
    const error = new Error("classIds must be a non-empty array");
    error.status = 400;
    throw error;
  }

  const subjects = await subjectService.getSubjectsByClassIds(classIds);
  sendResponse({
    res,
    message: "Subjects fetched successfully",
    data: subjects,
  });
});

// GET BY ID
export const getSubject = asyncHandler(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.params.id);

  if (!subject) {
    const error = new Error("Subject not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Subject fetched successfully",
    data: subject,
  });
});

// UPDATE
export const updateSubject = asyncHandler(async (req, res) => {
  const subject = await subjectService.updateSubject(
    req.params.id,
    req.body
  );

  if (!subject) {
    const error = new Error("Subject not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Subject updated successfully",
    data: subject,
  });
});

// DELETE
export const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await subjectService.deleteSubject(req.params.id);

  if (!subject) {
    const error = new Error("Subject not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Subject deleted successfully",
  });
});