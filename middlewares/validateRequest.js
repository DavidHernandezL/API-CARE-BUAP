const { ZodError } = require('zod');

const validateRequestBody = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (!error instanceof ZodError)
      return res.status(500).json({ msg: 'Error en el servidor' });
    res.status(400).json({ errors: error.issues.map((issue) => issue.message) });
  }
};

const validateRequestParams = (schema) => (req, res, next) => {
  try {
    schema.parse(req.params);
    next();
  } catch (error) {
    if (!error instanceof ZodError)
      return res.status(500).json({ msg: 'Error en el servidor' });
    res.status(400).json({ errors: error.issues.map((issue) => issue.message) });
  }
};

const validateRequestQuery = (schema) => (req, res, next) => {
  try {
    schema.parse(req.query);
    next();
  } catch (error) {
    if (!error instanceof ZodError)
      return res.status(500).json({ msg: 'Error en el servidor' });
    res.status(400).json({ errors: error.issues.map((issue) => issue.message) });
  }
};

module.exports = {
  validateRequestBody,
  validateRequestParams,
  validateRequestQuery,
};
