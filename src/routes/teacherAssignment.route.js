import express from "express";
import * as controller from "../controllers/teacherAssignment.controller.js";

const router = express.Router();

router.post("/", controller.assignTeacher);

// report (monthly, custom)
router.get("/report/:teacherId", controller.getReport);

export default router;