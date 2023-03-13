const supertest = require("supertest");
const app = require("../src/app");
const request = new supertest(app);

async function getAuthorizeToken() {
  const email = "email1@gmail.com";
  const name = "Test user";
  const password = "123456";
  const endpoint = process.env.END_POINT;
  let response = await request.post(`${endpoint}/user/create`).send({
    name: name,
    email: email,
    password: password,
  });
  expect(response.status).toBe(200);
  response = await request.post(`${endpoint}/login`).send({
    email: email,
    password: password,
  });

  const token = response.body.data.token;
  return token;
}
module.exports = { getAuthorizeToken };
