import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const StudentFeeDetail = sequelize.define("StudentFeeDetail", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  schoolId: { type: DataTypes.INTEGER, allowNull: false },
  studentFeeId: DataTypes.INTEGER,
  feeTypeId: DataTypes.INTEGER,

  amount: DataTypes.DECIMAL(10, 2),
  label: DataTypes.STRING,
});
export default StudentFeeDetail;