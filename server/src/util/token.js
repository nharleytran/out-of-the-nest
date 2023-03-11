import jsonWebToken from "jsonwebtoken";

export const createToken = ({ user, expiresIn }) => {
    console.log(user, expiresIn);
  return jsonWebToken.sign(user, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: expiresIn || "10s",
  });
};

export const decodeToken = (token) => {
  return jsonWebToken.verify(token, process.env.JWT_SECRET, {
    algorithm: "HS256",
    ignoreNotBefore: true,
  });
};
