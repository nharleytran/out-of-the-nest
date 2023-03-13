const app = require('../src/app');
const supertest = require('supertest');
const db = require('../src/data/db');
const userDAO = require('../src/data/UserDAO');
const dotenv = require('dotenv');
const {getAuthorizeToken} = require('./dummy_authorize');
dotenv.config();


const request = new supertest(app);
const userDao = new userDAO();

describe("Category test", () => {
    beforeAll(async () => {
        db.connect(process.env.DB_TEST_URI);
        await userDao.dropAll();
    });
    it("GET all category", async () => {
        const endpoint = process.env.END_POINT;
        const token = await getAuthorizeToken();
        
        let response = await request.get(`${endpoint}/categories`).set('Authorization', `Bearer ${token}`);
        const categories_name = ['Consulting', 'Software Engineering', 'Other Engineering Professions', 'Medical School', 'Graduate Programs'];
        response._body.data.forEach((category) => {
            expect(categories_name).toContain(category.name);
        });
        expect(response.status).toBe(200);
    });

});
