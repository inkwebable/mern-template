import { afterAll, afterEach, beforeAll, describe, it } from '@jest/globals';

import UserService from './user.service';
import TestDb from '../../utils/TestDb';

const dbHelper = new TestDb();

beforeAll(async () => {
  await dbHelper.start();
});

afterAll(async () => {
  await dbHelper.stop();
});

afterEach(async () => {
  await dbHelper.cleanup();
});

describe('user service', () => {
  it('should create a verified user', async () => {
    const userInput = {
      role: 'member',
      name: 'tester',
      email: 'tester@fake.com',
      password: 'test!234',
    };

    const user = await UserService.createVerifiedUser(userInput);

    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
  });
});
