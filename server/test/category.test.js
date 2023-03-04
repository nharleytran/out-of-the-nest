import app from "../src/index.js";
import supertest from "supertest";
import { expect, describe, it, beforeAll } from 'vitest'
import * as db from "../src/data/db.js";

const request = new supertest(app);

describe("Category test", () => {
    beforeAll(async () => {
        console.log(process.env.DB_TEST_URI);
        db.connect(process.env.DB_TEST_URI);
    });
    it("GET all category", async () => {
        const response = await request.get("/categories");
        const categories_name = ['Consulting', 'Software Engineering', 'Other Engineering Professions', 'Medical School', 'Graduate Programs'];
        response._body.data.forEach((category) => {
            expect(categories_name).toContain(category.name);
        });
        expect(response.status).toBe(200);
    });

});