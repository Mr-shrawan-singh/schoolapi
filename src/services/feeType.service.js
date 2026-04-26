import { FeeType } from "../models/index.js";
import { Op } from "sequelize";


export const createFeeType = async (data) => {
  const feeType = await FeeType.create(data);
  return feeType;
};

// export const getFeeTypes = async ( limit=10,offset=0, schoolId) => {
//   const { count, rows } = await FeeType.findAndCountAll({
//     where: { schoolId },
//     limit,
//     offset,
//   });
//   return { count, data: rows }; 
// };


export const getFeeTypes = async (
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
      name: {
        [Op.iLike]: `%${search}%`, // search by name
      },
    }),
  };

  const { count, rows } = await FeeType.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sortBy, order]],
  });

  return { count, data: rows };
};

export const getFeeTypeById = async (id) => {
  const feeType = await FeeType.findByPk(id);
  return feeType;
};


export const updateFeeType = async (id, data) => {
  const feeType = await FeeType.findByPk(id);
  if (!feeType) return null;
  await feeType.update(data);
  return feeType;
}

export const deleteFeeType = async (id) => {
  const feeType = await FeeType.findByPk(id);
  if (!feeType) return null;
  await feeType.destroy();
  return feeType;
}
        