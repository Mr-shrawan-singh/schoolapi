import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const StudentAcademicSubject = sequelize.define("StudentAcademicSubject", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  studentAcademicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default StudentAcademicSubject;