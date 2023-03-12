import app from "../src/index.js";
import supertest from "supertest";
import { expect, describe, it, beforeAll } from 'vitest'
import * as db from "../src/data/db.js";
import userDAO from "../src/data/UserDAO.js";
import { getAuthorizeToken } from "./dummy_authorize.js";

const request = new supertest(app);
const userDao = new userDAO();

describe("Category test", () => {
    beforeAll(async () => {
        db.connect(process.env.REACT_APP_DB_TEST_URI);
        userDao.dropAll();
    });
    it("GET all category", async () => {
        const token = await getAuthorizeToken();

        let response = await request.get("/categories").set('Authorization', `Bearer ${token}`);
        const categories_name = ['Consulting', 'Software Engineering', 'Other Engineering Professions', 'Medical School', 'Graduate Programs'];
        response._body.data.forEach((category) => {
            expect(categories_name).toContain(category.name);
        });
        expect(response.status).toBe(200);
    });

});
