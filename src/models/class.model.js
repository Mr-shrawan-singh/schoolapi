import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Class = sequelize.define(
  "Class",
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
    section: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "classes",
    timestamps: true,
  }
);

export default Class;