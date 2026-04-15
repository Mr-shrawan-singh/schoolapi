import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Subject = sequelize.define(
  "Subject",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // ✅ Mandatory
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // ✅ Optional
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "subjects",
    timestamps: true,
  }
);

export default Subject;