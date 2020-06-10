import { afterAll, beforeAll, describe, it } from '@jest/globals';

import TestDb from '../../utils/TestDb';
import UserService from './user.service';

const dbHelper = new TestDb();

beforeAll(async () => {
  await dbHelper.start();
});

afterAll(async () => {
  await dbHelper.cleanup();
  await dbHelper.stop();
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
    expect(user.isVerified).toEqual(true);
  });

  it('should create a non verified user', async () => {
    const userInput = {
      role: 'member',
      name: 'tester2',
      email: 'tester2@fake.com',
      password: 'test!234',
    };

    const user = await UserService.createNonVerifiedUser(userInput);

    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(user.isVerified).toEqual(false);
  });

  it('should save a user', async () => {
    const userInput = {
      role: 'member',
      name: 'tester2',
      email: 'tester2@fake.com',
      password: 'test!234',
    };

    const createdUser = await UserService.createNonVerifiedUser(userInput);
    const user = await UserService.saveUser(createdUser);

    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
  });

  it('should correctly determine if a user already exists', async () => {
    const user = await UserService.userExists('tester@fake.com');
    expect(user).toBe(true);
  });

  it('should not create a user if user already exists', async () => {
    const userInput = {
      role: 'member',
      name: 'tester2',
      email: 'tester2@fake.com',
      password: 'test!234',
    };

    try {
      await UserService.createVerifiedUser(userInput);
    } catch (e) {
      expect(e.message).toMatch('Email already used.');
    }
  });
});
