import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const FeeType = sequelize.define("FeeType", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  name: {
    type: DataTypes.STRING, // Tuition, Event, Practical
    allowNull: false,
  },
});

export default FeeType;