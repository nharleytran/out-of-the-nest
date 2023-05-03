const request = require("supertest");
const express = require("express");
const { authRouter } = require("../src/routes/auth");
const app = express();

app.use(express.json());
app.use("/auth", authRouter);

describe("Auth Routes", () => {


  describe("GET /auth/isAuthorized", () => {
    test("should respond with 200 if token is valid", async () => {
      const token = "<valid token here>";
      const response = await request(app)
        .get("/auth/isAuthorized")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });

  
});
