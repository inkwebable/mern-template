import supertest from 'supertest';
import { afterAll, afterEach, beforeAll, describe, it } from '@jest/globals';

import server from '../server';
import TestDbHelper from '../utils/TestDb';
import User from '../models/user/User';

const dbHelper = new TestDbHelper();

beforeAll(async () => {
  await dbHelper.start();
});

afterAll(async () => {
  await dbHelper.stop();

  if (server) {
    try {
      await server.close();
    } catch (e) {
      console.log('afterAll close server error', e);
    }
  }
});

afterEach(async () => {
  await dbHelper.cleanup();
});

describe('Login', () => {
  it('should not log in a non existent user ', async () => {
    const res = await supertest(server)
      .post('/api/login')
      .send({
        email: 'tj@fake.com',
        password: '12345678',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should log in a user ', async () => {
    const user = new User({
      role: 'member',
      name: 'tester',
      email: 'tester@fake.com',
      password: 'test!234',
      isVerified: true,
    });

    await user.save();

    const res = await supertest(server)
      .post('/api/login')
      .send({
        email: 'tester@fake.com',
        password: 'test!234',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('role');
  });
});
