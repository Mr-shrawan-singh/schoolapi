import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const StudentAcademic = sequelize.define("StudentAcademic", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  schoolId: DataTypes.INTEGER,
  studentId: DataTypes.INTEGER,
  classId: DataTypes.INTEGER,

  academicYear: DataTypes.STRING, // "2010-2011"

  status: {
    type: DataTypes.ENUM("studying", "passed", "failed"),
    defaultValue: "studying",
  },

  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
});
export default StudentAcademic;