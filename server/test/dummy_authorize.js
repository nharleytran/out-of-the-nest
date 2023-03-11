import supertest from "supertest";
import app from "../src/index.js";

const request = new supertest(app);

async function getAuthorizeToken() {
    const email = "email1@gmail.com";
    const name = "Test user";
    const password = "123456";
    let response = await request.post("/user/create").send({
      name: name,
      email: email,
      password: password,
    });
    response = await request.post("/login").send({
      email: email,
      password: password,
    });
    const token = response.body.data.token;
    return token;
}
export {getAuthorizeToken};
