import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const School = sequelize.define(
  "School",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId:{
     type: DataTypes.INTEGER,
     allowNull: false,
    unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // ✅ Optional
    principalName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    establishedYear: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    board: {
      type: DataTypes.STRING, // CBSE, ICSE, State Board
      allowNull: true,
    },

    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "schools",
    timestamps: true,
  }
);

export default School;