const app = require("../src/app");
const supertest = require("supertest");
const db = require("../src/data/db");
const UserDAO = require("../src/data/UserDAO");
const { hashPassword, verifyPassword } = require("../src/util/password");

const request = new supertest(app);

const userDao = new UserDAO();

describe("User Test", () => {
  beforeAll(async () => {
    db.connect(process.env.DB_TEST_URI);
  });

  beforeEach(async () => {
    await userDao.dropAll();
  });

  afterEach(async () => {});
  afterAll(async () => {
    await userDao.dropAll();
  });

  it("Create new user", async () => {
    const email = "abc@gmail.com";
    const name = "Test user";
    let response = await request.post("/user/create").send({
      name: name,
      email: email,
      password: "123456",
    });
    expect(response.status).toBe(200);

    const user = await userDao.findUserByEmail(email);
    expect(user.email).toBe(email);
    expect(user.name).toBe(name);
  });

  it("Not allow duplicate user email", async () => {
    userDao.dropAll();
    let response = await request.post("/user/create").send({
      name: "Test user",
      email: "abc@gmail.com",
      password: "123456",
    });
    expect(response.status).toBe(200);
    response = await request.post("/user/create").send({
      name: "Test user2",
      email: "abc@gmail.com",
      password: "123456",
    });
    expect(response.status).toBe(500);
  });

  it("create new user and login success", async () => {
    const email = "email1@gmail.com";
    const name = "Test user";
    const password = "123456";
    let response = await request.post("/user/create").send({
      name: name,
      email: email,
      password: password,
    });
    expect(response.status).toBe(200);

    response = await request.post("/login").send({
      email: email,
      password: password,
    });
    //expect(response.status).toBe(200);
  });

  it("create new user and login fail", async () => {
    const email = "email1@gmail.com";
    const name = "Test user";
    const password = "123456";
    let response = await request.post("/user/create").send({
      name: name,
      email: email,
      password: password,
    });
    expect(response.status).toBe(200);

    response = await request.post("/login").send({
      email: email,
      password: "1",
    });
    expect(response.status).toBe(403);
  });

  it("hash password test", async () => {
    const password = "123";
    const hash = hashPassword(password);
    expect(verifyPassword(password, hash)).toBe(true);

    const password2 = "1234";
    expect(verifyPassword(password2, hash)).toBe(false);
  });
});
