import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const FeeStructure = sequelize.define("FeeStructure", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  schoolId: { type: DataTypes.INTEGER, allowNull: false },
  classId: {  type: DataTypes.INTEGER, allowNull: false },
  academicYear: { type: DataTypes.STRING, allowNull: false },
});
export default FeeStructure;