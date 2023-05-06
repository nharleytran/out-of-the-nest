const UserDAO = require('../src/data/UserDAO');
const User = require('../src/model/User');

jest.mock('../src/model/User'); // mock User model

describe('UserDAO', () => {
  let userDAO;

  beforeEach(() => {
    userDAO = new UserDAO();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = {
        email: 'test@test.com',
        name: 'Test User',
        password: 'test1234',
      };

      const mockUser = {
        _id: 'abc123',
        ...newUser,
      };

      User.create.mockResolvedValueOnce(mockUser);

      const createdUser = await userDAO.createUser(newUser);

      expect(User.create).toHaveBeenCalledWith(newUser);
      expect(createdUser).toEqual(mockUser);
    });
  });

  describe('dropAll', () => {
    it('should delete all users', async () => {
      await userDAO.dropAll();

      expect(User.deleteMany).toHaveBeenCalled();
    });
  });

  describe('findUserById', () => {
    it('should find a user by id', async () => {
      const userId = 'abc123';
      const mockUser = {
        _id: userId,
        email: 'test@test.com',
        name: 'Test User',
        password: 'test1234',
      };

      User.findOne.mockResolvedValueOnce(mockUser);

      const foundUser = await userDAO.findUserById(userId);

      expect(User.findOne).toHaveBeenCalledWith({ _id: userId });
      expect(foundUser).toEqual(mockUser);
    });
  });

  describe('findUserByEmail', () => {
    it('should find a user by email', async () => {
      const userEmail = 'test@test.com';
      const mockUser = {
        _id: 'abc123',
        email: userEmail,
        name: 'Test User',
        password: 'test1234',
      };

      User.findOne.mockResolvedValueOnce(mockUser);

      const foundUser = await userDAO.findUserByEmail(userEmail);

      expect(User.findOne).toHaveBeenCalledWith({ email: userEmail });
      expect(foundUser).toEqual(mockUser);
    });
  });

  describe('deleteUserByEmail', () => {
    it('should delete a user by email', async () => {
      const userEmail = 'test@test.com';

      await userDAO.deleteUserByEmail(userEmail);

      expect(User.deleteOne).toHaveBeenCalledWith({ email: userEmail });
    });
  });

  describe('updateUserProfile', () => {
    it('should update a user profile', async () => {
      const userId = 'abc123';
      const updatedFields = {
        name: 'Updated User',
      };
      const mockUser = {
        _id: userId,
        email: 'test@test.com',
        name: 'Updated User',
        password: 'test1234',
      };

      User.findOneAndUpdate.mockResolvedValueOnce(mockUser);

      const updatedUser = await userDAO.updateUserProfile(userId, updatedFields);

      expect(User.findOneAndUpdate).toHaveBeenCalledWith({ _id: userId }, updatedFields);
      expect(updatedUser).toEqual(mockUser);
    });
  });
});
