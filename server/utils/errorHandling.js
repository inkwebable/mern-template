export const catchAsync = fn => {
  return (req, res, next) => {
    // can catch & log here
    fn(req, res, next).catch(err => {
      console.log('catchAsync', err);
      next(err);
    });
  };
};

export const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

export const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

export const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const errs = Object.keys(err.errors).map(key => {
    if ({}.hasOwnProperty.call(err.errors, key)) {
      return { key, message: err.errors[key].message };
    }
  });

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 422, errs);
};

export const handleExpressValidationError = err => {
  const errs = err.details.map(errorObj => {
    const objKeys = Object.keys(errorObj);
    return { key: objKeys[0], message: errorObj[objKeys[0]] };
  });

  return new AppError(err.message, err.statusCode, errs);
};

export const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({
    status: err.status,
    statusCode,
    isOperational: err.isOperational,
    errors: err.errors,
    message: err.message,
    stack: err.stack,
  });
};

export const sendErrorProd = (err, res) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors,
  });
};
