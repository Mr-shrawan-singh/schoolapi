import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Teacher = sequelize.define(
  "Teacher",
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

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // ✅ Optional
    qualification: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "teachers",
    timestamps: true,
  }
);

export default Teacher;