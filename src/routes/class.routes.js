import express from "express";
import * as classController from "../controllers/class.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, classController.createClass);
router.get("/", protect, classController.getClasses);
router.get("/:id", protect, classController.getClass);
router.put("/:id", protect, classController.updateClass);
router.delete("/:id", protect, classController.deleteClass);

export default router;