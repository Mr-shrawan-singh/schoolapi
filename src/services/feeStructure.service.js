import { FeeStructure } from "../models/index.js";
import { Op } from "sequelize";

// CREATE
export const createFeeStructure = async (data) => {
  return await FeeStructure.create(data);
};

// GET ALL (pagination + search + sort)
export const getFeeStructures = async (
  limit = 10,
  offset = 0,
  schoolId,
  search = "",
  sortBy = "createdAt",
  order = "DESC"
) => {
  const where = {
    schoolId,
    ...(search && {
      academicYear: {
        [Op.iLike]: `%${search}%`,
      },
    }),
  };

  const { count, rows } = await FeeStructure.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sortBy, order]],
    include:[
      {
        association: "Class",
        attributes: ["id", "name"]
      }
    ]
  });

  return { count, data: rows };
};

// GET BY ID
export const getFeeStructureById = async (id) => {
  return await FeeStructure.findByPk(
    id,{
  include:[
    {
      association: "Class",
      attributes: ["id", "name"]
    }
  ]
});
};

// UPDATE
export const updateFeeStructure = async (id, data) => {
  const record = await FeeStructure.findByPk(id);
  if (!record) return null;

  await record.update(data);
  return record;
};

// DELETE
export const deleteFeeStructure = async (id) => {
  const record = await FeeStructure.findByPk(id);
  if (!record) return null;

  await record.destroy();
  return record;
};