class AppError extends Error {
  constructor(message, statusCode, errors = []) {
    super();

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
