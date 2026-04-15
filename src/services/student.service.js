import { Student, User, StudentAcademic, Class } from "../models/index.js";

// CREATE
export const createStudent = async (data) => {
  return await Student.create(data);
};

// GET ALL (with academic history)
export const getAllStudents = async (schoolId, limit, offset) => {
  return await Student.findAndCountAll({
    where: { schoolId },
    limit,
    offset,
    order: [["id", "DESC"]],
    include: [
      {
        model: User,
        as: "creator",
        attributes: ["id", "name"],
      },
      {
        model: StudentAcademic,
        include: [
          {
            model: Class,
            attributes: ["id", "name", "section"],
          },
        ],
      },
    ],
  });
};

// GET BY ID
export const getStudentById = async (id, schoolId) => {
  return await Student.findOne({
    where: { id, schoolId },
    include: [
      {
        model: User,
        as: "creator",
        attributes: ["id", "name"],
      },
      {
        model: StudentAcademic,
        include: [
          {
            model: Class,
            attributes: ["id", "name", "section"],
          },
        ],
      },
    ],
  });
};

// UPDATE
export const updateStudent = async (id, schoolId, data) => {
  const student = await Student.findOne({
    where: { id, schoolId },
  });

  if (!student) return null;

  await student.update(data);
  return student;
};

// DELETE
export const deleteStudent = async (id, schoolId) => {
  const student = await Student.findOne({
    where: { id, schoolId },
  });

  if (!student) return null;

  await student.destroy();
  return true;
};