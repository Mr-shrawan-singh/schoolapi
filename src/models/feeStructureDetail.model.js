import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const FeeStructureDetail = sequelize.define(
  "FeeStructureDetail",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    schoolId: { type: DataTypes.INTEGER, allowNull: false },
    feeStructureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    feeTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    label: {
      type: DataTypes.STRING, // e.g., Term 1, Event 1
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["feeStructureId", "feeTypeId", "label"], // prevent duplicates
      },
    ],
  }
);

export default FeeStructureDetail;