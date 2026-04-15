import express from "express";
import * as userController from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// CREATE USER
router.post(
  "/",protect,
  (req, res, next) => {
    req.uploadFolder = "userimages"; 
    next();
  },
  upload.single("image"),
  userController.createUser
);

// UPDATE USER (with image)
router.put(
  "/:id",
  (req, res, next) => {
    req.uploadFolder = "userimages";
    next();
  },
  upload.single("image"),
  userController.updateUser
);

// GET
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);

// DELETE
router.delete("/:id", userController.deleteUser);

export default router;