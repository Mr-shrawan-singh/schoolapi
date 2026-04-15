
import express from "express";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import { protect } from "./middlewares/auth.middleware.js";
import schoolRoutes from "./routes/school.route.js";
import subjectRoutes from "./routes/subject.route.js";
import classRoutes from "./routes/class.routes.js";
import teacherRoutes from "./routes/teacher.route.js";
import teacherAssignmentRoutes from "./routes/teacherAssignment.route.js";
import studentRoutes from "./routes/student.routes.js";
import studentAcademicRoutes from "./routes/studentAcademic.routes.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/schools",protect,schoolRoutes);
app.use("/subjects", protect,subjectRoutes);
app.use("/classes", protect, classRoutes);
app.use("/teachers", protect, teacherRoutes);
app.use("/teacher_assignments",protect,teacherAssignmentRoutes);
app.use("/students", protect, studentRoutes );
app.use("/student_academic", protect, studentAcademicRoutes);
app.use(errorHandler);
export default app;