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