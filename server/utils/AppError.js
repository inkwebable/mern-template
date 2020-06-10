class AppError extends Error {
  constructor(message, statusCode, errors = []) {
    super();

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors;
    this.message = message;

    if ({}.hasOwnProperty.call(Error, 'captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      Object.defineProperty(this, 'stack', {
        value: new Error().stack,
      });
    }

    // Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
