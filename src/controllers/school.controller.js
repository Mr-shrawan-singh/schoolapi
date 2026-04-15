import * as schoolService from "../services/school.service.js";
import { sendResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination, getPagingData } from "../utils/pagination.js";
import fs from "fs";

// CREATE
export const createSchool = asyncHandler(async (req, res) => {
  const imagePath = req.file ? req.file.path : null;
  const userId =req.user.id; 
  const allreadyExists = await schoolService.getSchoolByUserId(userId);
  if(allreadyExists){
    return sendResponse({
      res,
      status: 400,
      message: "A school profile already exists for this user",
    });
  }


  const school = await schoolService.createSchool({
    ...req.body,
    image: imagePath,
    userId: userId,
  });

  sendResponse({
    res,
    status: 201,
    message: "School created successfully",
    data: school,
  });
});

// GET ALL
export const getSchools = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);

  const { count, rows } = await schoolService.getAllSchools(limit, offset);

  const updated = rows.map((s) => ({
    ...s.toJSON(),
    image: s.image
      ? `${req.protocol}://${req.get("host")}/${s.image.replace(/\\/g, "/")}`
      : null,
  }));

  const { pagination } = getPagingData(count, rows, page, limit);

  sendResponse({
    res,
    message: "Schools fetched successfully",
    data: updated,
    pagination,
  });
});

// GET BY ID
export const getSchool = asyncHandler(async (req, res) => {
  const school = await schoolService.getSchoolById(req.params.id);

  if (!school) {
    const error = new Error("School not found");
    error.status = 404;
    throw error;
  }

  sendResponse({
    res,
    message: "School fetched successfully",
    data: school,
  });
});

// UPDATE
export const updateSchool = asyncHandler(async (req, res) => {
  const existing = await schoolService.getSchoolById(req.params.id);

  if (!existing) {
    const error = new Error("School not found");
    error.status = 404;
    throw error;
  }

  let imagePath = existing.image;

  if (req.file) {
    if (existing.image && fs.existsSync(existing.image)) {
      fs.unlinkSync(existing.image);
    }
    imagePath = req.file.path;
  }

  const updated = await schoolService.updateSchool(req.params.id, {
    ...req.body,
    image: imagePath,
  });

  sendResponse({
    res,
    message: "School updated successfully",
    data: updated,
  });
});

// DELETE
export const deleteSchool = asyncHandler(async (req, res) => {
  const school = await schoolService.getSchoolById(req.params.id);

  if (!school) {
    const error = new Error("School not found");
    error.status = 404;
    throw error;
  }

  if (school.image && fs.existsSync(school.image)) {
    fs.unlinkSync(school.image);
  }

  await schoolService.deleteSchool(req.params.id);

  sendResponse({
    res,
    message: "School deleted successfully",
  });
});