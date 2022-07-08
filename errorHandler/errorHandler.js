const errorHandler = (error, req, res, next) => {
  console.log(error);
  // if (error) {
  //   return res.status(500).json({ error });
  // }
  next();
};

module.exports = errorHandler;
