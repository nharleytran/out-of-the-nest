import app from "../src/index.js";
import supertest from "supertest";
import { expect, describe, it, beforeAll, beforeEach, afterEach } from "vitest";
import * as db from "../src/data/db.js";
import UserDAO from "../src/data/UserDAO.js";

const request = new supertest(app);

export const userDao = new UserDAO();

describe("User Test", () => {
  beforeAll(async () => {
    db.connect(process.env.DB_TEST_URI);
  });

  beforeEach(async () => {
    await userDao.dropAll();
  });

  afterEach(async () => {
    await userDao.dropAll();
  });

  it("Create new user", async () => {
    const email = "abc@gmail.com";
    const name = "Test user";
    let response = await request.post("/user/create").send({
      name: name,
      email: email,
      password_hash: "123456",
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
      password_hash: "123456",
    });
    expect(response.status).toBe(200);
    response = await request.post("/user/create").send({
      name: "Test user2",
      email: "abc@gmail.com",
      password_hash: "123456",
    });
    expect(response.status).toBe(500);
  });

  it("create new user and login success", async () => {
    const email = "email1@gmail.com";
    const name = "Test user";
      const password_hash = "123456";
    let response = await request.post("/user/create").send({
      name: name,
      email: email,
      password_hash: password_hash,
    });
    expect(response.status).toBe(200);

    response = await request.post("/login").send({
      email: email,
      password_hash: password_hash,
    });
    expect(response.status).toBe(200);
  });

  it("create new user and login fail", async () => {
    const email = "email1@gmail.com";
    const name = "Test user";
      const password_hash = "123456";
    let response = await request.post("/user/create").send({
      name: name,
      email: email,
      password_hash: password_hash,
    });
    expect(response.status).toBe(200);

    response = await request.post("/login").send({
      email: email,
      password_hash: "1",
    });
      console.log(response.body);
    expect(response.status).toBe(403);
  });

});
