import { User } from "../models/index.js";
import bcrypt from "bcryptjs";

export const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await User.create({ ...data, password: hashedPassword });
};


//login 

export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return null;

  return user;
};
// GET ALL
export const getAllUsers = async (limit, offset) => {
  return await User.findAndCountAll({
    limit,
    offset,
    attributes: { exclude: ["password"] }, 
  });
};

// GET BY ID
export const getUserById = async (id) => {
  return await User.findByPk(id);
};

// UPDATE
export const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(data);
  return user;
};

// DELETE
export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.destroy();
  return true;
};