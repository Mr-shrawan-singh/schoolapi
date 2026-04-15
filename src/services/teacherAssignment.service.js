import { TeacherAssignment } from "../models/index.js";
import { Op } from "sequelize";

const checkTeacherConflict = async (data) => {
  return await TeacherAssignment.findOne({
    where: {
      teacherId: data.teacherId,
      dayOfWeek: data.dayOfWeek,

      startDate: { [Op.lte]: data.startDate },
      [Op.or]: [
        { endDate: null },
        { endDate: { [Op.gte]: data.startDate } },
      ],

      startTime: { [Op.lt]: data.endTime },
      endTime: { [Op.gt]: data.startTime },
    },
  });
};

const checkClassConflict = async (data) => {
  return await TeacherAssignment.findOne({
    where: {
      classId: data.classId,
      dayOfWeek: data.dayOfWeek,

      startDate: { [Op.lte]: data.startDate },
      [Op.or]: [
        { endDate: null },
        { endDate: { [Op.gte]: data.startDate } },
      ],

      startTime: { [Op.lt]: data.endTime },
      endTime: { [Op.gt]: data.startTime },
    },
  });
};

export const assignTeacher = async ({
  teacherId,
  assignments,
  schoolId,
  startDate,
}) => {
  for (const a of assignments) {
    const teacherConflict = await checkTeacherConflict({
      teacherId,
      ...a,
      startDate,
    });

    if (teacherConflict) throw new Error("Teacher time conflict");

    const classConflict = await checkClassConflict({
      ...a,
      startDate,
    });

    if (classConflict) throw new Error("Class already assigned");
  }

  // close old assignments
  await TeacherAssignment.update(
    { endDate: new Date(startDate.getTime() - 1) },
    {
      where: { teacherId, schoolId, endDate: null },
    }
  );

  const payload = assignments.map((a) => ({
    ...a,
    teacherId,
    schoolId,
    startDate,
    endDate: null,
  }));

  return await TeacherAssignment.bulkCreate(payload);
};

export const getTeacherReport = async (teacherId, from, to) => {
  return await TeacherAssignment.findAll({
    where: {
      teacherId,
      startDate: { [Op.lte]: to },
      [Op.or]: [
        { endDate: null },
        { endDate: { [Op.gte]: from } },
      ],
    },
  });
};