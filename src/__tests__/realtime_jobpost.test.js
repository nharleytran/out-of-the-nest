import { getJobs } from '../api/realtime_jobpost';
import { axiosInstance } from '../api/index';

jest.mock('../api/index', () => ({
  axiosInstance: {
    get: jest.fn(),
  },
}));

describe('getJobs', () => {
  it('should call axiosInstance.get with correct parameters', async () => {
    const location = 'San Francisco';
    const search = 'Software Engineer';
    const sort_by = 'date';
    const responseMock = { data: [{ id: 1, title: 'Software Engineer' }] };
    axiosInstance.get.mockResolvedValueOnce(responseMock);

    const data = await getJobs({ location, search, sort_by });

    expect(axiosInstance.get).toHaveBeenCalledTimes(1);
    expect(axiosInstance.get).toHaveBeenCalledWith('/jobs', {
      params: { location, search, sort_by },
    });
    expect(data).toEqual(responseMock.data);
  });

  it('should throw an error when the request fails', async () => {
    const location = 'San Francisco';
    const search = 'Software Engineer';
    const sort_by = 'date';
    const errorMock = new Error('Network error');
    axiosInstance.get.mockRejectedValueOnce(errorMock);

    await expect(getJobs({ location, search, sort_by })).rejects.toThrow(
      errorMock
    );
  });
});
