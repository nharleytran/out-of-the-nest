import { axiosInstance } from '../api/index';
import { getSuggestion } from '../api/recipe';

// mock the axiosInstance to return a fake response
jest.mock('../api/index', () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

describe('getSuggestion', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns a suggestion when passed valid inputs', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: { suggestion: 'Accept' } });

    const result = await getSuggestion({ gpa: 3.5, testscore: 1200, extracurriculars: 5, experience: 2, comment: 'I love this school!' });

    expect(result).toEqual({ suggestion: 'Accept' });
    expect(axiosInstance.post).toHaveBeenCalledWith('/recipe', { gpa: 3.5, testscore: 1200, extracurriculars: 5, experience: 2, comment: 'I love this school!' });
  });

  it('throws an error when the API call fails', async () => {
    axiosInstance.post.mockRejectedValueOnce(new Error('API error'));

    await expect(getSuggestion({ gpa: 3.5, testscore: 1200, extracurriculars: 5, experience: 2, comment: 'I love this school!' })).rejects.toThrow('API error');
    expect(axiosInstance.post).toHaveBeenCalledWith('/recipe', { gpa: 3.5, testscore: 1200, extracurriculars: 5, experience: 2, comment: 'I love this school!' });
  });
});
