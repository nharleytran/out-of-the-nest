const { getApiUrl, getAuthorizeToken, connectDB } = require("./utils");

describe('getAuthorizeToken', () => {
  beforeAll(async () => {
    await connectDB();
  });

  it('should return an authorization token', async () => {
    const token = await getAuthorizeToken();
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
});

describe('connectDB', () => {
  it('should connect to the database', async () => {
    await expect(connectDB()).resolves.not.toThrow();
  });
});

describe('getApiUrl', () => {
  it('should return the API URL', () => {
    const url = getApiUrl();
    expect(url).toBeDefined();
    expect(typeof url).toBe('string');
  });
});
