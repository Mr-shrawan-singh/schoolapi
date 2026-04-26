import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const FeeType = sequelize.define("FeeType", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  schoolId: { type: DataTypes.INTEGER, allowNull: false },
  name: {
    type: DataTypes.STRING, // Tuition, Event, Practical
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default FeeType;