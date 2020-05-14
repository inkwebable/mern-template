export default () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : process.env.CLIENT_URL;
};
