import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ClassSubject = sequelize.define(
  "ClassSubject",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "class_subjects",
    timestamps: false,
  }
);

export default ClassSubject;