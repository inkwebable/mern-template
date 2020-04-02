const prodKeys = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  frontUrl: process.env.CLIENT_URL,
  mongoUrl: process.env.MONGO_URL,
  dbEnv: process.env.DB_ENV,
  nodeEnv: process.env.NODE_ENV,
};

export default prodKeys;
