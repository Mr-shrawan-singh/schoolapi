import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
const FeePayment = sequelize.define("FeePayment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  studentFeeId: DataTypes.INTEGER,

  amount: DataTypes.DECIMAL(10, 2),
  paymentDate: DataTypes.DATE,
  paymentMode: DataTypes.STRING,
});
export default FeePayment;