import { Teacher, School } from "../models/index.js";

// CREATE
export const createTeacher = async (data) => {
  // ✅ check school exists
  const school = await School.findByPk(data.schoolId);
  if (!school) {
    throw new Error("Invalid School ID");
  }

  return await Teacher.create(data);
};

// GET ALL (filter by school)
export const getAllTeachers = async (limit, offset, schoolId) => {
  const where = {};

  if (schoolId) {
    where.schoolId = schoolId;
  }

  return await Teacher.findAndCountAll({
    where,
    limit,
    offset,
    include: [
      {
        model: School,
        attributes: ["id", "name"],
      },
    ],
  });
};

// GET BY ID
export const getTeacherById = async (id) => {
  return await Teacher.findByPk(id, {
    include: [{ model: School, attributes: ["id", "name"] }],
  });
};

// UPDATE
export const updateTeacher = async (id, data) => {
  const teacher = await Teacher.findByPk(id);
  if (!teacher) return null;

  await teacher.update(data);
  return teacher;
};

// DELETE
export const deleteTeacher = async (id) => {
  const teacher = await Teacher.findByPk(id);
  if (!teacher) return null;

  await teacher.destroy();
  return true;
};