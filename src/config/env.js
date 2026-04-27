import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
/* Zod schema for env validation */
const envSchema = z.object({
  PORT: z.string().default("3000"),

  // DB_NAME: z.string({
  //   required_error: "DB_NAME is required",
  // }),

  // DB_USER: z.string({
  //   required_error: "DB_USER is required",
  // }),

  // DB_PASSWORD: z.string({
  //   required_error: "DB_PASSWORD is required",
  // }),

  // DB_HOST: z.string({
  //   required_error: "DB_HOST is required",
  // }),

  DB_DIALECT: z.string().default("postgres"),
  JWT_SECRET: z.string({
    required_error: "JWT_SECRET is required",
  }),
});

/* Validate and export */
export const env = envSchema.parse(process.env);