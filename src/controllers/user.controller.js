import * as userService from "../services/user.service.js";
import { sendResponse } from "../utils/response.js";
import { getPagination, getPagingData } from "../utils/pagination.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import { User } from "../models/index.js";


// CREATE
export const createUser = asyncHandler(async (req, res) => {
  const imagePath = req.file ? req.file.path : null;

  const user = await userService.createUser({
    ...req.body,
    image: imagePath,
  });

  sendResponse({
    res,
    status: 201,
    message: "User created successfully",
    data: user,
  });
});


// GET ALL (WITH PAGINATION)
export const getUsers = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);

  const { count, rows } = await userService.getAllUsers(limit, offset);

  const updatedUsers = rows.map((user) => ({
    ...user.toJSON(),
    image: user.image
      ? `${req.protocol}://${req.get("host")}/${user.image.replace(/\\/g, "/")}`
      : null,
  }));

  const { pagination } = getPagingData(count, rows, page, limit);

  sendResponse({
    res,
    message: "Users fetched successfully",
    data: updatedUsers,
    pagination,
  });
});


// GET BY ID
export const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const updatedUser = {
    ...user.toJSON(),
    image: user.image
      ? `${req.protocol}://${req.get("host")}/${user.image.replace(/\\/g, "/")}`
      : null,
  };

  sendResponse({
    res,
    message: "User fetched successfully",
    data: updatedUser,
  });
});


// UPDATE
export const updateUser = asyncHandler(async (req, res) => {
  const existingUser = await userService.getUserById(req.params.id);

  if (!existingUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  let imagePath = existingUser.image;

  if (req.file) {
    if (existingUser.image && fs.existsSync(existingUser.image)) {
      fs.unlinkSync(existingUser.image);
    }
    imagePath = req.file.path;
  }

  const updatedUser = await userService.updateUser(req.params.id, {
    ...req.body,
    image: imagePath,
  });

  sendResponse({
    res,
    message: "User updated successfully",
    data: updatedUser,
  });
});


// DELETE
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (user.image && fs.existsSync(user.image)) {
    fs.unlinkSync(user.image);
  }

  await userService.deleteUser(req.params.id);

  sendResponse({
    res,
    message: "User deleted successfully",
  });
});


// DROPDOWN (SELECT BOX)
export const getUsersDropdown = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);

  const { count, rows } = await User.findAndCountAll({
    limit,
    offset,
    attributes: ["id", "name"],
  });

  const data = rows.map((u) => ({
    label: u.name,
    value: u.id,
  }));

  const { pagination } = getPagingData(count, rows, page, limit);

  sendResponse({
    res,
    message: "Dropdown data fetched",
    data,
    pagination,
  });
});