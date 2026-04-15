export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const formattedErrors = {};

    if (error.issues) {
      error.issues.forEach((err) => {
        const field = err.path[0];

        if (!formattedErrors[field]) {
          formattedErrors[field] = [];
        }

        formattedErrors[field].push(err.message);
      });
    }

    return res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
  }
};