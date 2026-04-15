import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      schoolId: user.schoolId 
    },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};