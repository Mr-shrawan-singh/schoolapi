import { Class, Subject } from "../models/index.js";

// CREATE CLASS WITH SUBJECTS
export const createClass = async (data) => {
  const { subjectIds, ...classData } = data;

  const newClass = await Class.create(classData);

  if (subjectIds && subjectIds.length > 0) {
    await newClass.setSubjects(subjectIds); // 🔥 MAGIC
  }

  return newClass;
};

// GET ALL WITH SUBJECTS
export const getAllClasses = async (limit, offset) => {
  return await Class.findAndCountAll({
    limit,
    offset,
    include: [
      {
        model: Subject,
        attributes: ["id", "name"],
        through: { attributes: [] }, // hide junction table
      },
    ],
  });
};

// GET BY ID
export const getClassById = async (id) => {
  return await Class.findByPk(id, {
    include: [
      {
        model: Subject,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });
};

// UPDATE
export const updateClass = async (id, data) => {
  const { subjectIds, ...classData } = data;

  const existing = await Class.findByPk(id);
  if (!existing) return null;

  await existing.update(classData);

  if (subjectIds) {
    await existing.setSubjects(subjectIds); // 🔥 update relation
  }

  return existing;
};

// DELETE
export const deleteClass = async (id) => {
  const existing = await Class.findByPk(id);
  if (!existing) return null;

  await existing.destroy();
  return true;
};