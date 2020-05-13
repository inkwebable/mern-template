const catchAsync = fn => {
  return (req, res, next) => {
    // can catch & log here
    fn(req, res, next).catch(err => {
      console.log('catchAsync', err);
      next(err);
    });
  };
};

export default catchAsync;
