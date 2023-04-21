const jwt = require('jsonwebtoken');
const { createToken, decodeToken } = require('../src/util/token');

describe('jwt', () => {
  const mockUser = { id: '123', email: 'test@example.com' };
  const mockExpiresIn = '1h';
  const mockToken = 'abc.123.def';

  beforeEach(() => {
    process.env.REACT_APP_JWT_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createToken', () => {
    it('should create a valid JWT token', () => {
      const signSpy = jest.spyOn(jwt, 'sign').mockReturnValue(mockToken);

      const token = createToken({ user: mockUser, expiresIn: mockExpiresIn });

      expect(signSpy).toHaveBeenCalledWith(mockUser, 'test-secret', {
        algorithm: 'HS256',
        expiresIn: mockExpiresIn,
      });
      expect(token).toEqual(mockToken);
    });

    it('should create a token with default expiration if expiresIn is not provided', () => {
      const signSpy = jest.spyOn(jwt, 'sign').mockReturnValue(mockToken);

      const token = createToken({ user: mockUser });

      expect(signSpy).toHaveBeenCalledWith(mockUser, 'test-secret', {
        algorithm: 'HS256',
        expiresIn: '2h',
      });
      expect(token).toEqual(mockToken);
    });
  });

  describe('decodeToken', () => {
    it('should decode a valid JWT token', () => {
      const verifySpy = jest.spyOn(jwt, 'verify').mockReturnValue(mockUser);

      const decodedUser = decodeToken(mockToken);

      expect(verifySpy).toHaveBeenCalledWith(mockToken, 'test-secret', {
        algorithm: 'HS256',
        ignoreNotBefore: true,
      });
      expect(decodedUser).toEqual(mockUser);
    });

    it('should throw an error if the token is invalid', () => {
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => decodeToken('invalid-token')).toThrow('Invalid token');
    });
  });
});
