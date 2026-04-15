import * as service from "../services/teacherAssignment.service.js";

export const assignTeacher = async (req, res) => {
  try {
    const schoolId = req.user.schoolId;

    const data = await service.assignTeacher({
      teacherId: req.body.teacherId,
      assignments: req.body.assignments,
      schoolId,
      startDate: new Date(req.body.startDate),
    });

    res.json({ message: "Assigned successfully", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getReport = async (req, res) => {
  const { teacherId } = req.params;
  const { from, to } = req.query;

  const data = await service.getTeacherReport(
    teacherId,
    new Date(from),
    new Date(to)
  );

  res.json(data);
};