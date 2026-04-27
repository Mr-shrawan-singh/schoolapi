import { Sequelize } from "sequelize";
import { env } from "./env.js";

// export const sequelize = new Sequelize(
//   env.DB_NAME,
//   env.DB_USER,
//   env.DB_PASSWORD,
//   {
//     host: env.DB_HOST,
//     dialect: "postgres",
//     logging: false,
//   }
// );

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