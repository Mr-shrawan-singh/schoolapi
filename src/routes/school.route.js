import express from "express";
import * as schoolController from "../controllers/school.controller.js";
import { upload } from "../middlewares/upload.js";
import { validate } from "../middlewares/validate.js";
import { createSchoolSchema ,updateSchoolSchema} from "../validations/school.validation.js";

const router = express.Router();
// CREATE
router.post(
  "/",
  (req, res, next) => {
    req.uploadFolder = "schoolimages";
    next();
  },
  upload.single("image"),
   validate(createSchoolSchema),
  schoolController.createSchool
);

// UPDATE
router.put(
  "/:id",
  (req, res, next) => {
    req.uploadFolder = "schoolimages";
    next();
  },
  upload.single("image"),
  validate(updateSchoolSchema),
  schoolController.updateSchool
);

// GET
router.get("/", schoolController.getSchools);
router.get("/:id", schoolController.getSchool);

// DELETE
router.delete("/:id", schoolController.deleteSchool);

export default router;