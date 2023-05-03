const bcrypt = require("bcryptjs");
const { hashPassword, verifyPassword } = require("../src/util/password");

describe("passwordUtils", () => {
  describe("hashPassword", () => {
    it("should hash a password correctly", () => {
      const password = "testPassword";
      const hashedPassword = hashPassword(password);
      const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);
      expect(isPasswordCorrect).toBe(true);
    });

    it("should throw an error if bcrypt.hashSync throws an error", () => {
      const password = "testPassword";
      bcrypt.genSaltSync = jest.fn(() => {
        throw new Error("Salt generation failed");
      });
      expect(() => hashPassword(password)).toThrow();
    });
  });

  
});

