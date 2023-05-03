const ApiError = require('../src/model/ApiError');

describe('ApiError', () => {
  test('should be an instance of Error', () => {
    const error = new ApiError(404, 'Not Found');
    expect(error instanceof Error).toBe(true);
  });

  test('should have the correct status and message', () => {
    const status = 404;
    const message = 'Not Found';
    const error = new ApiError(status, message);
    expect(error.status).toBe(status);
    expect(error.message).toBe(message);
  });
});
