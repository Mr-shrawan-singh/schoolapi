import {
  StudentAcademic,
  Class,
  Student,
  Subject,
} from "../models/index.js";
import { Op } from "sequelize";



// ✅ CREATE (with subjects)
export const createAcademic = async (data) => {
  const { subjectIds, schoolId, studentId } = data;

  // 🔒 check active record
  const existing = await StudentAcademic.findOne({
    where: {
      studentId,
      schoolId,
      status: "studying",
    },
  });

  if (existing) {
    throw new Error("Student already has active class");
  }

  const academic = await StudentAcademic.create(data);

  // 🔥 attach subjects
  if (subjectIds?.length) {
    await academic.setSubjects(subjectIds);
  }

  return academic;
};



// ✅ GET ALL
export const getAllAcademic = async (schoolId, limit, offset) => {
  return await StudentAcademic.findAndCountAll({
    where: { schoolId },
    limit,
    offset,
    order: [["id", "DESC"]],
    include: [
      {
        model: Student,
        attributes: ["id", "name"],
      },
      {
        model: Class,
        attributes: ["id", "name", "section"],
      },
      {
        model: Subject,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });
};



// ✅ GET BY ID
export const getAcademicById = async (id, schoolId) => {
  return await StudentAcademic.findOne({
    where: { id, schoolId },
    include: [
      { model: Student },
      { model: Class },
      {
        model: Subject,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });
};



// ✅ UPDATE (with subjects)
export const updateAcademic = async (id, schoolId, data) => {
  const { subjectIds, ...updateData } = data;

  const record = await StudentAcademic.findOne({
    where: { id, schoolId , endDate: {
        [Op.is]: null, // ✅ correct NULL check
      },},
  });

  if (!record) return null;

  await record.update(updateData);

  // 🔥 update subjects
  if (subjectIds) {
    await record.setSubjects(subjectIds);
  }

  return record;
};



// ✅ DELETE
export const deleteAcademic = async (id, schoolId) => {
  const record = await StudentAcademic.findOne({
    where: { id, schoolId },
  });

  if (!record) return null;

  await record.destroy();
  return true;
};



// ✅ PROMOTE / FAIL (with subjects)
export const promoteStudent = async ({
  studentId,
  currentAcademicId,
  nextClassId,
  academicYear,
  result,
  subjectIds,
  schoolId,
}) => {
  const current = await StudentAcademic.findOne({
    where: { id: currentAcademicId, schoolId },
  });

  if (!current) throw new Error("Academic record not found");

  // close current
  await current.update({
    status: result === "pass" ? "passed" : "failed",
    endDate: new Date(),
  });

  const getNextAcademicYear = (year) => {
  if (!year) return "";

  const [start, end] = year.split("-");

  const nextStart = Number(start) + 1;
  const nextEnd = Number(end) + 1;

  // keep last 2 digits format
  const formattedEnd = nextEnd.toString().slice(-2);

  return `${nextStart}-${formattedEnd}`;
};
 const academicYear1= getNextAcademicYear(current.academicYear);
  // create new academic
  const newAcademic = await StudentAcademic.create({
    studentId,
    schoolId,
    classId: result === "pass" ? nextClassId : current.classId,
    academicYear:academicYear1,
    status: "studying",
    startDate: new Date(),
  });

  console.log("New Academic Record:", newAcademic.toJSON(),subjectIds);
  // 🔥 assign subjects
  if (subjectIds?.length) {
    await newAcademic.setSubjects(subjectIds);
  }

  return newAcademic;
};