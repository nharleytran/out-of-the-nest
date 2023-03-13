const supertest = require("supertest");
const app = require("../src/app");
const request = new supertest(app);
const db = require("../src/data/db");

function getApiUrl() {
  return globalThis.__API_URL__;
}

async function getAuthorizeToken() {
  const email = "email1@gmail.com";
  const name = "Test user";
  const password = "123456";
  const api_url = getApiUrl();
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
async function connectDB() {
  await db.connect(globalThis.__TEST_DB_URI__);
}

module.exports = { getAuthorizeToken, connectDB, getApiUrl };
