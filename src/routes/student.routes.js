import express from "express";
import * as controller from "../controllers/student.controller.js";
import { validate } from "../middlewares/validate.js";
import { createStudentSchema, updateStudentSchema } from "../validations/student.validation.js";
const router = express.Router();

router.post("/",   validate(createStudentSchema), controller.createStudent);
router.get("/",   controller.getStudents);
router.get("/:id",   controller.getStudent);
router.put("/:id",   validate(updateStudentSchema),   controller.updateStudent);
router.delete("/:id",   controller.deleteStudent);

export default router;