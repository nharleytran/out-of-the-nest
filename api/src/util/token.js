const jsonWebToken = require("jsonwebtoken");

const createToken = ({ user, expiresIn }) => {
  return jsonWebToken.sign(user, process.env.REACT_APP_JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: expiresIn || "1h",
  });
};

const decodeToken = (token) => {
  return jsonWebToken.verify(token, process.env.REACT_APP_JWT_SECRET, {
    algorithm: "HS256",
    ignoreNotBefore: true,
  });
};

module.exports = { createToken, decodeToken };
