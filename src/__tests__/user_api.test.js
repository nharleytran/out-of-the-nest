import { updateUserProfile, getUser } from '../api/user_api';
import { axiosInstance } from '../api/index';

jest.mock('../api/index', () => ({
  axiosInstance: {
    put: jest.fn(),
    get: jest.fn()
  }
}));

describe('updateUserProfile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a PUT request to the correct endpoint', async () => {
    const userId = 1;
    const updatedFields = { name: 'John Doe', email: 'john@example.com' };
    axiosInstance.put.mockResolvedValueOnce({ data: { data: updatedFields } });

    await updateUserProfile(userId, updatedFields);

    expect(axiosInstance.put).toHaveBeenCalledWith(`/user/update/${userId}`, updatedFields);
  });

  it('should return the updated fields', async () => {
    const userId = 1;
    const updatedFields = { name: 'John Doe', email: 'john@example.com' };
    axiosInstance.put.mockResolvedValueOnce({ data: { data: updatedFields } });

    const result = await updateUserProfile(userId, updatedFields);

    expect(result).toEqual(updatedFields);
  });

  it('should throw an error if the PUT request fails', async () => {
    const userId = 1;
    const updatedFields = { name: 'John Doe', email: 'john@example.com' };
    const error = new Error('Failed to update user');
    axiosInstance.put.mockRejectedValueOnce(error);

    await expect(updateUserProfile(userId, updatedFields)).rejects.toThrow(error);
  });
});

describe('getUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request to the correct endpoint', async () => {
    const userId = 1;
    const userData = { name: 'John Doe', email: 'john@example.com' };
    axiosInstance.get.mockResolvedValueOnce({ data: { data: userData } });

    await getUser(userId);

    expect(axiosInstance.get).toHaveBeenCalledWith(`/user/profile/${userId}`);
  });

  it('should return the user data', async () => {
    const userId = 1;
    const userData = { name: 'John Doe', email: 'john@example.com' };
    axiosInstance.get.mockResolvedValueOnce({ data: { data: userData } });

    const result = await getUser(userId);

    expect(result).toEqual(userData);
  });

  it('should throw an error if the GET request fails', async () => {
    const userId = 1;
    const error = new Error('Failed to get user');
    axiosInstance.get.mockRejectedValueOnce(error);

    await expect(getUser(userId)).rejects.toThrow(error);
  });
});
