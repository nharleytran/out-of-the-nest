import { uploadImage, getImagePathById } from '../api/image_api';
import { axiosInstance } from '../api/index';

jest.mock('../api/index', () => ({ axiosInstance: { post: jest.fn() } }));

describe('uploadImage', () => {
  it('should call axiosInstance.post with the correct arguments', async () => {
    const fd = new FormData();
    await uploadImage(fd);
    expect(axiosInstance.post).toHaveBeenCalledWith('/image/upload', fd);
  });
});

describe('getImagePathById', () => {
  it('should return the correct image path', () => {
    const id = '123';
    process.env.REACT_APP_API = 'https://example.com';
    expect(getImagePathById(id)).toEqual('https://example.com/image/123');
  });
});
