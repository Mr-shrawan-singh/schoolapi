import express from "express";
import * as controller from "../controllers/studentAcademic.controller.js";
import { validate } from "../middlewares/validate.js";
import { createAcademicSchema, promoteStudentSchema } from "../validations/studentAcademic.validation.js";

const router = express.Router();

router.post("/",   validate(createAcademicSchema), controller.createAcademic);
router.get("/",   controller.getAcademic);
router.get("/:id",   controller.getAcademicById);
router.put("/:id",   validate(createAcademicSchema), controller.updateAcademic);
router.delete("/:id",   controller.deleteAcademic);

// promotion
router.post("/promote",   validate(promoteStudentSchema), controller.promoteStudent);

export default router;