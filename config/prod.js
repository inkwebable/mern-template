const prodKeys = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  clientUrl: process.env.CLIENT_URL,
  mongoUrl: process.env.MONGO_URL,
  dbEnv: process.env.DB_ENV,
  nodeEnv: process.env.NODE_ENV,
  emailRegistration: process.env.EMAIL_REGISTRATION,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
};

export default prodKeys;
