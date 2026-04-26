import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
const StudentFee = sequelize.define("StudentFee", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  schoolId: { type: DataTypes.INTEGER, allowNull: false },
  studentAcademicId: DataTypes.INTEGER,
  feeStructureId: DataTypes.INTEGER,

  totalFee: DataTypes.DECIMAL(10, 2),
  paidAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  dueAmount: DataTypes.DECIMAL(10, 2),

  status: {
    type: DataTypes.ENUM("unpaid", "partial", "paid"),
    defaultValue: "unpaid",
  },
});
export default StudentFee;