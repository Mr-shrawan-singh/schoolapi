import { FeeStructureDetail } from "../models/index.js";
import { Op } from "sequelize";

// CREATE
export const createFeeStructureDetail = async (data) => {
  return await FeeStructureDetail.create(data);
};

// GET ALL (pagination + filter + search + sort)
export const getFeeStructureDetails = async (
  limit = 10,
  offset = 0,
  feeStructureId,
  search = "",
  sortBy = "createdAt",
  order = "DESC"
) => {
  const where = {
    ...(feeStructureId && { feeStructureId }),
    ...(search && {
      label: {
        [Op.iLike]: `%${search}%`,
      },
    }),
  };

const { count, rows } = await FeeStructureDetail.findAndCountAll({
  where,
  limit,
  offset,
  include: [
    {
      association: "FeeType",
      attributes: ["id", "name"],
    },
    {
      association: "FeeStructure",
      attributes: ["id", "academicYear", "classId"],
      include: [
        {
          association: "Class",
          attributes: ["id", "name"],
        },
      ],
    },
  ],
  order: [[sortBy, order]],
});

// ✅ Proper mapping
const data = rows.map((row) => ({
  id: row.id,
  feeStructureId: row.feeStructureId,
  feeTypeId: row.feeTypeId,
  amount: row.amount,
  label: row.label,

  feeTypeName: row.FeeType?.name || null,

  feeStructureName:
    row.FeeStructure && row.FeeStructure.Class
      ? `${row.FeeStructure.Class.name} (${row.FeeStructure.academicYear})`
      : null,
}));

// ✅ return correct response
return { count, data };
};



// GET BY ID
export const getFeeStructureDetailById = async (id) => {
const row = await FeeStructureDetail.findByPk(id,{
  include: [
    {
      association: "FeeType",
      attributes: ["id", "name"],
    },
    {
      association: "FeeStructure",
      attributes: ["id", "academicYear", "classId"],
      include: [
        {
          association: "Class",
          attributes: ["id", "name"],
        },
      ],
    },
  ],
  });

if (!row) return null;

return {
  id: row.id,
  feeStructureId: row.feeStructureId,
  feeTypeId: row.feeTypeId,
  amount: row.amount,
  label: row.label,

  feeTypeName: row.FeeType?.name || null,

  feeStructureName:
    row.FeeStructure && row.FeeStructure.Class
      ? `${row.FeeStructure.Class.name} (${row.FeeStructure.academicYear})`
      : null,
}
};

// UPDATE
export const updateFeeStructureDetail = async (id, data) => {
  const record = await FeeStructureDetail.findByPk(id);
  if (!record) return null;

  await record.update(data);
  return record;
};

// DELETE
export const deleteFeeStructureDetail = async (id) => {
  const record = await FeeStructureDetail.findByPk(id);
  if (!record) return null;

  await record.destroy();
  return record;
};