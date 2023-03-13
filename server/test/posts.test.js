import app from "../src/index.js";
import supertest from "supertest";
import { expect, describe, it, beforeAll } from 'vitest'
import * as db from "../src/data/db.js";
import { getAuthorizeToken } from "./dummy_authorize.js";

const request = new supertest(app);

describe("Posts Test", () => {
    beforeAll(async () => {
        db.connect(process.env.DB_TEST_URI);
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
        expect(delReponse.status).toBe(200);

        getpostReponse = await request.get("/posts/" + post_id).set('Authorization', `Bearer ${token}`);;
        expect(getpostReponse.status).toBe(500);//make sure it is no longer exists

    });

});

