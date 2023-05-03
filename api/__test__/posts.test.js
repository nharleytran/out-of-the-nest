const app = require("../src/app");
const supertest = require("supertest");
const db = require("../src/data/db");
const { getAuthorizeToken, connectDB, getApiUrl } = require("./utils");
const UserDAO = require("../src/data/UserDAO");
const PostDAO = require("../src/data/PostDAO");
const CategoryDAO = require("../src/data/CategoryDAO");
const mongoose = require("mongoose");


const request = new supertest(app);

describe("Posts Test", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
  });
  it("Get a post unauthorized", async () => {
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
    expect(getpostReponse.status).toBe(200); //check if it is created
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

  it("Create new post without required fields", async () => {
    const token = await getAuthorizeToken();
    const api_url = getApiUrl();
  
    const response = await request
      .post(`${api_url}/posts`)
      .send({})
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(500); //expect to fail
  });

  it("Edit an existing post", async () => {
    const token = await getAuthorizeToken();
    const api_url = getApiUrl();
  
    // Create a new post
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
  
    // Edit the post
    const editResponse = await request
      .put(`${api_url}/posts/${post_id}`)
      .send({
        title: "Edited Test Post",
        content: "Edited Test Content",
        author: "Edited Test Author",
      })
      .set("Authorization", `Bearer ${token}`);
  
    expect(editResponse.status).toBe(200);
  
    // Get the post to check if it was edited successfully
    const getpostReponse = await request
      .get(`${api_url}/posts/${post_id}`)
      .set("Authorization", `Bearer ${token}`);
  
    expect(getpostReponse.status).toBe(200); //check if it exists
  });

  it("Edit a non-existent post", async () => {
    const token = await getAuthorizeToken();
    const api_url = getApiUrl();
  
    const editResponse = await request
      .put(`${api_url}/posts/nonexistentpost`)
      .send({
        title: "Edited Test Post",
        content: "Edited Test Content",
        author: "Edited Test Author",
      })
      .set("Authorization", `Bearer ${token}`);
  
    expect(editResponse.status).toBe(404);
  });

  it("Delete a non-existent post", async () => {
    const token = await getAuthorizeToken();
    const api_url = getApiUrl();
  
    const delReponse = await request
      .delete(`${api_url}/posts/nonexistentpost`)
      .set("Authorization", `Bearer ${token}`);
  
    expect(delReponse.status).toBe(500);
  });


  it("Create new post with existing title", async () => {
    const token = await getAuthorizeToken();
    const api_url = getApiUrl();
    const postTitle = "Test Post";


    const response_post = await request
      .post(`${api_url}/posts`)
      .send({
        title: postTitle,
        content: "Test Content",
        author: "Test Author",
      })
      .set("Authorization", `Bearer ${token}`);
      expect(response_post.status).toBe(200); //expect to fail since title is already taken

  
    // Create a new post with the same title as the previous test
    const response = await request
      .post(`${api_url}/posts`)
      .send({
        title: postTitle,
        content: "Test Content",
        author: "Test Author",
      })
      .set("Authorization", `Bearer ${token}`);
  
    expect(response.status).toBe(200); 
  });







  
  
  
  
  
});




