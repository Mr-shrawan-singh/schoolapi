import * as classService from "../services/class.service.js";
import { sendResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE
export const createClass = asyncHandler(async (req, res) => {
console.log(req.user, "User info in createClass controller");
  const data = await classService.createClass({...req.body, schoolId: req.user.schoolId});

  sendResponse({
    res,
    status: 201,
    message: "Class created successfully",
    data,
  });
});

// GET ALL
export const getClasses = asyncHandler(async (req, res) => {
  const { count, rows } = await classService.getAllClasses();

  sendResponse({
    res,
    message: "Classes fetched",
    data: rows,
  });
});

// GET BY ID
export const getClass = asyncHandler(async (req, res) => {
  const data = await classService.getClassById(req.params.id);

  if (!data) throw new Error("Class not found");

  sendResponse({
    res,
    message: "Class fetched",
    data,
  });
});

// UPDATE
export const updateClass = asyncHandler(async (req, res) => {
  const data = await classService.updateClass(req.params.id, req.body);

  if (!data) throw new Error("Class not found");

  sendResponse({
    res,
    message: "Class updated",
    data,
  });
});

// DELETE
export const deleteClass = asyncHandler(async (req, res) => {
  const data = await classService.deleteClass(req.params.id);

  if (!data) throw new Error("Class not found");

  sendResponse({
    res,
    message: "Class deleted",
  });
});