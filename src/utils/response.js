export const sendResponse = ({
  res,
  status = 200,
  success = true,
  message = "",
  data = null,
  pagination = null,
}) => {
  res.status(status).json({
    success,
    message,
    ...(pagination && { pagination }),
    ...(data && { data }),
  });
};

export const sendResponseRSSMDP = (
  res,
  status = 200,
  success = true,
  message = "",
  data = null,
  pagination = null
) => {
  return res.status(status).json({
    success,
    message,
    data: data,
    pagination,
  });
};

export const sendResponseW = (
  res,
  status = 200,
  success = true,
  message = "",
  data = null
) => {
  return res.status(status).json({
    success,
    message,
    data,
  });
};