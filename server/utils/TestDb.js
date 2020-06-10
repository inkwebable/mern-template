import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export default class TestDb {
  constructor() {
    this.db = null;
    this.server = new MongoMemoryServer();
  }

  async start() {
    const url = await this.server.getConnectionString();

    const options = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 10,
      bufferMaxEntries: 0,
    };

    await mongoose
      .connect(url, options)
      .then(() => console.log('connected', url))
      .catch((e) => console.log('con error', e));
  }

  async stop() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    return this.server.stop();
  }

  async cleanup() {
    const { collections } = mongoose.connection;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
}
