const axios = require('axios');
const express = require('express');
const request = require('supertest');

const API_URL = "https://findwork.dev/api/jobs/";

const app = express();
const router = require('../src/routes/jobpost');

app.use(router);

describe('GET /jobs', () => {
  it('should return a list of jobs', async () => {
    const expectedJobs = [{ id: 1, title: 'Job 1' }, { id: 2, title: 'Job 2' }];
    axios.get = jest.fn().mockResolvedValueOnce({ data: expectedJobs });

    const response = await request(app).get('/jobs').query({ location: 'New York', search: 'developer', sort_by: 'date' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedJobs);
    expect(axios.get.mock.calls[0][0]).toBe(API_URL);
    expect(axios.get.mock.calls[0][1].params).toEqual({ location: 'New York', search: 'developer', sort_by: 'date' });
    expect(axios.get.mock.calls[0][1].headers.Authorization).toBe(`Token ${process.env.REACT_APP_FINDWORK_API_KEY}`);

    axios.get.mockRestore();
  });

  it('should return an error message', async () => {
    const expectedErrorMessage = 'Internal Server Error';
    axios.get = jest.fn().mockRejectedValueOnce(new Error(expectedErrorMessage));

    const response = await request(app).get('/jobs').query({ location: 'New York', search: 'developer', sort_by: 'date' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: expectedErrorMessage });
    expect(axios.get.mock.calls[0][0]).toBe(API_URL);
    expect(axios.get.mock.calls[0][1].params).toEqual({ location: 'New York', search: 'developer', sort_by: 'date' });
    expect(axios.get.mock.calls[0][1].headers.Authorization).toBe(`Token ${process.env.REACT_APP_FINDWORK_API_KEY}`);

    axios.get.mockRestore();
  });
});
