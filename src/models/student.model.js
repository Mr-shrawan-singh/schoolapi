import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
const Student = sequelize.define("Student", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
  },

  phone: DataTypes.STRING,
  address: DataTypes.STRING,

  aadhar: {
    type: DataTypes.STRING,
    unique: true,
  },

  admissionDate: DataTypes.DATE,
  leavingDate: DataTypes.DATE,

  schoolId: DataTypes.INTEGER,
  createdBy: DataTypes.INTEGER,
});
export default Student;