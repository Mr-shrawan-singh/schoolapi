import { Sequelize } from "sequelize";
import { env } from "./env.js";

export const sequelize = new Sequelize(
  process.env.DB_URL ,
  {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);