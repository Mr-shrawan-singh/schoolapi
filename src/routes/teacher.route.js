import express from "express";
import * as teacherController from "../controllers/teacher.controller.js";
import { validate } from "../middlewares/validate.js";
import { createTeacherSchema } from "../validations/teacher.validation.js";

const router = express.Router();

router.post("/",  validate(createTeacherSchema), teacherController.createTeacher);

router.get("/",  teacherController.getTeachers);
router.get("/:id",  teacherController.getTeacher);

router.put("/:id",  teacherController.updateTeacher);

router.delete("/:id",  teacherController.deleteTeacher);

export default router;