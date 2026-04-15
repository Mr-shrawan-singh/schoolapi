import express from "express";
import * as subjectController from "../controllers/subject.controller.js";
import { validate } from "../middlewares/validate.js";
import { createSubjectSchema } from "../validations/subject.validation.js";
import { getSubjectsByClassIds } from "../controllers/subject.controller.js";

const router = express.Router();

// CREATE
router.post("/", validate(createSubjectSchema), subjectController.createSubject);

// GET ALL (filter: ?schoolId=1)
router.get("/", subjectController.getSubjects);

router.post("/class/ids", subjectController.getSubjectsByClassIds);

// GET BY ID
router.get("/:id", subjectController.getSubject);

// UPDATE
router.put("/:id", subjectController.updateSubject);

// DELETE
router.delete("/:id", subjectController.deleteSubject);

export default router;