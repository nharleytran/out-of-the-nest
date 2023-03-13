const supertest = require("supertest");
const app = require("../src/app");
const request = new supertest(app);

async function getAuthorizeToken() {
  const email = "email1@gmail.com";
  const name = "Test user";
  const password = "123456";
  const api_url = process.env.REACT_APP_API;
  let response = await request.post(`${api_url}/user/create`).send({
    name: name,
    email: email,
    password: password,
  });
  expect(response.status).toBe(200);
  response = await request.post(`${api_url}/login`).send({
    email: email,
    password: password,
  });

  const token = response.body.data.token;
  return token;
}
module.exports = { getAuthorizeToken };
