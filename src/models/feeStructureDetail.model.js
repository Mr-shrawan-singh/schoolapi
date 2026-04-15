import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const FeeStructureDetail = sequelize.define("FeeStructureDetail", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  feeStructureId: DataTypes.INTEGER,
  feeTypeId: DataTypes.INTEGER,

  amount: DataTypes.DECIMAL(10, 2),

  label: DataTypes.STRING, // Event 1, Event 2
});
export default FeeStructureDetail;