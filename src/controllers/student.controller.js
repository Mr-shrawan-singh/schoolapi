import * as studentService from "../services/student.service.js";
import { sendResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination, getPagingData } from "../utils/pagination.js";

// CREATE
export const createStudent = asyncHandler(async (req, res) => {
  console.log("Creating student with data:", req.body);
  
  const student = await studentService.createStudent({
    ...req.body,
    schoolId: req.user.schoolId,
    createdBy: req.user.id,
  });

  sendResponse({
    res,
    status: 201,
    message: "Student created successfully",
    data: student,
  });
});

// GET ALL
export const getStudents = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);

  const { count, rows } = await studentService.getAllStudents(
    req.user.schoolId,
    limit,
    offset
  );

  const { pagination } = getPagingData(count, rows, page, limit);

  sendResponse({
    res,
    message: "Students fetched successfully",
    data: rows,
    pagination,
  });
});

// GET BY ID
export const getStudent = asyncHandler(async (req, res) => {
  const student = await studentService.getStudentById(
    req.params.id,
    req.user.schoolId
  );

  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Student fetched successfully",
    data: student,
  });
});

// UPDATE
export const updateStudent = asyncHandler(async (req, res) => {
  const student = await studentService.updateStudent(
    req.params.id,
    req.user.schoolId,
    req.body
  );

  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Student updated successfully",
    data: student,
  });
});

// DELETE
export const deleteStudent = asyncHandler(async (req, res) => {
  const deleted = await studentService.deleteStudent(
    req.params.id,
    req.user.schoolId
  );

  if (!deleted) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "Student deleted successfully",
  });
});