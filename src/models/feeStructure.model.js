import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const FeeStructure = sequelize.define("FeeStructure", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  classId: DataTypes.INTEGER,
  academicYear: DataTypes.STRING,
});
export default FeeStructure;