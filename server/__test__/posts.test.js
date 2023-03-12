const app = require('../src/app');
const supertest = require('supertest');
const db = require('../src/data/db');
const {getAuthorizeToken} = require('./dummy_authorize');
const UserDAO = require('../src/data/UserDAO');
const PostDAO = require('../src/data/PostDAO');
const userDAO = new UserDAO();
const postDAO = new PostDAO();

const request = new supertest(app);

describe("Posts Test", () => {
    beforeAll(async () => {
        db.connect(process.env.DB_TEST_URI);
        await userDAO.dropAll();
    });
    it("Create new post and delete", async () => {
        const token = await getAuthorizeToken();

        const response = await request.post("/posts").send({
            title: "Test Post",
            content: "Test Content",
            author: "Test Author",
        }).set('Authorization', `Bearer ${token}`);;
        expect(response.status).toBe(200);//expect to success create

        const post_id = response._body.data._id;
        let getpostReponse = await request.get("/posts/" + post_id).set('Authorization', `Bearer ${token}`);;
        expect(getpostReponse.status).toBe(200); //check if it is created

        const delReponse = await request.delete("/posts/" + post_id).set('Authorization', `Bearer ${token}`);;
        console.log(post_id, delReponse.data, delReponse.status, delReponse.message);
        expect(delReponse.status).toBe(200);

        getpostReponse = await request.get("/posts/" + post_id).set('Authorization', `Bearer ${token}`);;
        expect(getpostReponse.status).toBe(500);//make sure it is no longer exists

    });

});

