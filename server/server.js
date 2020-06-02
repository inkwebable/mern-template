import app from './app/app';

const server = app.listen(process.env.NODE_ENV === 'test' ? 5222 : process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.NODE_ENV === 'test' ? 5222 : process.env.PORT}!`);
});

export default server;
