import app from "../src/index.js";
import supertest from "supertest";
import { expect, describe, it, beforeAll } from "vitest";
import * as db from "../src/data/db.js";
import UserDAO from "../src/data/UserDAO.js";

const request = new supertest(app);

export const userDao = new UserDAO();
describe("User Test", () => {
  beforeAll(async () => {
    db.connect(process.env.DB_TEST_URI);
    userDao.dropAll();
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
});
