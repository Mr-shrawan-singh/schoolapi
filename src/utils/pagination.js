export const getPagination = (query) => {
  let page = parseInt(query.page) || 1;
  let limit = parseInt(query.limit) || 10;

  if (limit > 100) limit = 100;

  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

export const getPagingData = (count, rows, page, limit) => {
  return {
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
    data: rows,
  };
};