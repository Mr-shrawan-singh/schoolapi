import * as teacherService from "../services/teacher.service.js";
import { sendResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination, getPagingData } from "../utils/pagination.js";

// CREATE
export const createTeacher = asyncHandler(async (req, res) => {
    const schoolId = req.user.schoolId;
    if (!schoolId) {
      const error = new Error("schoolId is required");
      error.status = 400;
      throw error;
    }
  const data = await teacherService.createTeacher({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    qualification: req.body.qualification,
    experience: Number(req.body.experience),
    schoolId
  });

  sendResponse({
    res,
    status: 201,
    message: "Teacher created successfully",
    data,
  });
});

// GET ALL
export const getTeachers = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const schoolId  = req.user.schoolId;

  const { count, rows } = await teacherService.getAllTeachers(
    limit,
    offset,
    schoolId
  );

  const { pagination } = getPagingData(count, rows, page, limit);

  sendResponse({
    res,
    message: "Teachers fetched successfully",
    data: rows,
    pagination,
  });
});

// GET BY ID
export const getTeacher = asyncHandler(async (req, res) => {
  const data = await teacherService.getTeacherById(req.params.id);

  if (!data) {
    const error = new Error("Teacher not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Teacher fetched successfully",
    data,
  });
});

// UPDATE
export const updateTeacher = asyncHandler(async (req, res) => {
  const data = await teacherService.updateTeacher(
    req.params.id,
    {
      ...req.body,
      experience: Number(req.body.experience)
    }
  );

  if (!data) {
    const error = new Error("Teacher not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Teacher updated successfully",
    data,
  });
});

// DELETE
export const deleteTeacher = asyncHandler(async (req, res) => {
  const data = await teacherService.deleteTeacher(req.params.id);

  if (!data) {
    const error = new Error("Teacher not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Teacher deleted successfully",
  });
});