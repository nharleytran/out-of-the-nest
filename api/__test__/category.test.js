const app = require("../src/app");
const supertest = require("supertest");
const db = require("../src/data/db");
const userDAO = require("../src/data/UserDAO");
const dotenv = require("dotenv");
const { getAuthorizeToken, connectDB, getApiUrl } = require("./utils");
const mongoose = require("mongoose");

const request = new supertest(app);
const userDao = new userDAO();

describe("Category test", () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("GET all category", async () => {
    const api_url = getApiUrl();
    const token = await getAuthorizeToken();

    let response = await request
      .get(`${api_url}/categories`)
      .set("Authorization", `Bearer ${token}`);
    const categories_name = [
      "Consulting",
      "Software Engineering",
      "Other Engineering Professions",
      "Medical School",
      "Graduate Programs",
    ];
    response._body.data.forEach((category) => {
      expect(categories_name).toContain(category.name);
    });
    expect(response.status).toBe(200);
  });
});
