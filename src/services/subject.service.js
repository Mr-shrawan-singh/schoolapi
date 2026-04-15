import { Subject, School,ClassSubject } from "../models/index.js";

// CREATE
export const createSubject = async (data, schoolId) => {
  return await Subject.create({ ...data, schoolId });
};

// GET ALL (with filter by schoolId)
export const getAllSubjects = async (limit, offset, schoolId) => {
  const where = {};

  if (schoolId) {
    where.schoolId = schoolId; 

  }

  return await Subject.findAndCountAll({
    where,
    limit,
    offset,
  
  });
};

// subject by classides
export const getSubjectsByClassIds = async (classIds) => {
  return await ClassSubject.findAll({
    where: {
      classId: { [Op.in]: classIds }, // ✅ filter here
    },
    include: [
      {
        model: Subject,
        attributes: ["id", "name"],
      },
    ],
  });
};

// include: [
//       {
//         model: School,
//         attributes: ["id", "name"],
//       },
//     ],

// GET BY ID
export const getSubjectById = async (id) => {
  return await Subject.findByPk(id, {
    include: [{ model: School, attributes: ["id", "name"] }],
  });
};

// UPDATE
export const updateSubject = async (id, data) => {
  const subject = await Subject.findByPk(id);
  if (!subject) return null;

  await subject.update(data);
  return subject;
};

// DELETE
export const deleteSubject = async (id) => {
  const subject = await Subject.findByPk(id);
  if (!subject) return null;

  await subject.destroy();
  return true;
};