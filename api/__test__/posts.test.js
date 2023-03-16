const app = require("../src/app");
const supertest = require("supertest");
const db = require("../src/data/db");
const { getAuthorizeToken, connectDB, getApiUrl } = require("./utils");
const UserDAO = require("../src/data/UserDAO");
const PostDAO = require("../src/data/PostDAO");
const mongoose = require("mongoose");

const userDAO = new UserDAO();
const postDAO = new PostDAO();
const request = new supertest(app);

describe("Posts Test", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Create new post and delete", async () => {
    const token = await getAuthorizeToken();
    const api_url = getApiUrl();

    const response = await request
      .post(`${api_url}/posts`)
      .send({
        title: "Test Post",
        content: "Test Content",
        author: "Test Author",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200); //expect to success create

    const post_id = response._body.data._id;
    let getpostReponse = await request
      .get(`${api_url}/posts/` + post_id)
      .set("Authorization", `Bearer ${token}`);
    expect(getpostReponse.status).toBe(200); //check if it is created

    const delReponse = await request
      .delete(`${api_url}/posts/` + post_id)
      .set("Authorization", `Bearer ${token}`);
    expect(delReponse.status).toBe(200);

    getpostReponse = await request
      .get(`${api_url}/posts/` + post_id)
      .set("Authorization", `Bearer ${token}`);
    expect(getpostReponse.status).toBe(500); //make sure it is no longer exists
  });
});
