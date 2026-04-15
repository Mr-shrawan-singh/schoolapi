import { School } from "../models/index.js";

// CREATE
export const createSchool = async (data) => {
  console.log("Data received in service:", data);
  return await School.create(data);
};

// GET ALL
export const getAllSchools = async (limit, offset) => {
  return await School.findAndCountAll({
    limit,
    offset,
  });
};

// GET BY ID
export const getSchoolById = async (id) => {
  return await School.findByPk(id);
};


// get school by userId
export const getSchoolByUserId = async (userId) => {
  return await School.findOne({ where: { userId } });
};
// UPDATE
export const updateSchool = async (id, data) => {
  const school = await School.findByPk(id);
  if (!school) return null;

  await school.update(data);
  return school;
};

// DELETE
export const deleteSchool = async (id) => {
  const school = await School.findByPk(id);
  if (!school) return null;

  await school.destroy();
  return true;
};