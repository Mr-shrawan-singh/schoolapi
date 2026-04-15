import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const TeacherAssignment = sequelize.define(
  "TeacherAssignment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "teachers", key: "id" },
    },

    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "classes", key: "id" },
    },

    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "subjects", key: "id" },
    },

    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: true },

    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },

    dayOfWeek: {
      type: DataTypes.ENUM("Mon","Tue","Wed","Thu","Fri","Sat"),
      allowNull: false,
    },
  },
  {
    tableName: "teacher_assignments",
    timestamps: true,

    indexes: [
      {
        unique: true,
        name: "unique_teacher_assignment",
        fields: [
          "teacherId",
          "classId",
          "subjectId",
          "dayOfWeek",
          "startTime",
          "schoolId",
        ],
      },
      { fields: ["teacherId"] },
      { fields: ["classId"] },
      { fields: ["schoolId"] },
    ],
  }
);

export default TeacherAssignment;