const app = require("../src/app");
const supertest = require("supertest");
const db = require("../src/data/db");
const UserDAO = require("../src/data/UserDAO");
const { hashPassword, verifyPassword } = require("../src/util/password");
const { getApiUrl, getAuthorizeToken, connectDB } = require("./utils");
const mongoose = require("mongoose");

const request = new supertest(app);

const userDao = new UserDAO();



describe("User Test", () => {
  const deleteIfExist = async (email) => {
    const api_url = getApiUrl();
    let user = await userDao.findUserByEmail(email);
    if (user) {
      await request.delete(`${api_url}/user/email/delete/${email}`);
    }
  };

  beforeAll(async () => {
    await connectDB();
    // await userDao.dropAll();
  });

  beforeEach(async () => {
    // await userDao.dropAll();
  });

  afterEach(async () => {});
  afterAll(async () => {
    // await userDao.dropAll();
    await mongoose.connection.close();
  });

  it("Create new user", async () => {
    const email = "abc@gmail.com";
    const name = "Test user";
    const api_url = getApiUrl();
    await deleteIfExist(email);
    let response = await request.post(`${api_url}/user/create`).send({
      name: name,
      email: email,
      password: "123456",
    });
    expect(response.status).toBe(200);
    await deleteIfExist(email);
    
  });

  it("Not allow duplicate user email", async () => {
    // userDao.dropAll();
    const api_url = getApiUrl();
    const email= "abcd@gmail.com";
    let response = await request.post(`${api_url}/user/create`).send({
      name: "Test user",
      email: email,
      password: "123456",
    });
    expect(response.status).toBe(200);
    response = await request.post(`${api_url}/user/create`).send({
      name: "Test user2",
      password: "123456",
      email: email,
    });
    expect(response.status).toBe(500);
    response = await request.delete(`${api_url}/user/email/delete/${email}`);
    expect(response.status).toBe(200);
  });
  
  it("create new user and login success", async () => {
    const email = "testuser1@gmail.com";
    const name = "Test user";
    const password = "123456";
    const api_url = getApiUrl();
    let response = await request.post(`${api_url}/user/create`).send({
      name: name,
      email: email,
      password: password,
    });
    console.log(response.body);
    expect(response.status).toBe(200);
  
    response = await request.post(`${api_url}/login`).send({
      email: email,
      password: password,
    });
    expect(response.status).toBe(200);
    response = await request.delete(`${api_url}/user/email/delete/${email}`);
    expect(response.status).toBe(200);
  });
  
  // it("create new user and login fail", async () => {
  //   const email = "testuser2@gmail.com";
  //   const name = "Test user";
  //   const password = "123456";
  //   const api_url = getApiUrl();
  //   let response = await request.post(`${api_url}/user/create`).send({
  //     name: name,
  //     email: email,
  //     password: password,
  //   });
  //   expect(response.status).toBe(500);
  
  //   response = await request.post(`${api_url}/login`).send({
  //     email: email,
  //     password: "1",
  //   });
  //   expect(response.status).toBe(403);
  //   response = await request.delete(`${api_url}/user/email/delete/${email}`);
  //   expect(response.status).toBe(200);
  // });
  
  it("hash password test", async () => {
    const password = "123";
    const hash = hashPassword(password);
    expect(verifyPassword(password, hash)).toBe(true);
  
    const password2 = "1234";
    expect(verifyPassword(password2, hash)).toBe(false);
  });
});
