const supertest = require("supertest");
const app = require("../src/app");
const request = new supertest(app);
const db = require("../src/data/db");
const UserDAO = require("../src/data/UserDAO");
const userDao = new UserDAO();

function getApiUrl() {
  return process.env.REACT_APP_API_URL;
}

async function getAuthorizeToken() {
  const email = "authorizedusertest@gmail.com";
  const name = "Test user";
  const password = "123456";
  const api_url = getApiUrl();
  const user = await userDao.findUserByEmail(email);

  if (!user) {
    let response = await request.post(`${api_url}/user/create`).send({
      name: name,
      email: email,
      password: password,
    });
    expect(response.status).toBe(200);
  }
  response = await request.post(`${api_url}/login`).send({
    email: email,
    password: password,
  });
  expect(response.status).toBe(200);

  const token = response.body.data.token;
  return token;
}
async function connectDB() {
  if (!process.env.REACT_APP_DB_TEST_URI) {
    throw new Error("REACT_APP_DB_TEST_URI is not defined in .env.test");
  }
  await db.connect(process.env.REACT_APP_DB_TEST_URI);
}

module.exports = { getAuthorizeToken, connectDB, getApiUrl };
