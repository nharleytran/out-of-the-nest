const assert = require("assert");
const request = require("supertest");
const app = require("../src/app");
const { OpenAIApi } = require("openai");

describe("POST /api/recipe", () => {
  it("should return a 200 status code and a result", (done) => {
    const requestData = {
      gpa: 3.8,
      testscore: 1500,
      extracurriculars: "debate team, robotics club",
      experience: "internship at a startup",
      comment: "I'm interested in applying to top engineering schools."
    };

    request(app)
      .post("/api/recipe")
      .send(requestData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.result);
        done();
      });
  }, 12000);

  it("should return a 500 status code and an error message if there is an error with the OpenAI API request", (done) => {
    const requestData = {
      gpa: 3.8,
      testscore: 1500,
      extracurriculars: "debate team, robotics club",
      experience: "internship at a startup",
      comment: "I'm interested in applying to top engineering schools."
    };

    const errorMessage = "An error occurred during your request.";
    const openaiApiStub = jest.spyOn(OpenAIApi.prototype, "createCompletion").mockRejectedValue(new Error(errorMessage));

    request(app)
      .post("/api/recipe")
      .send(requestData)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.error.message === errorMessage);
        openaiApiStub.mockRestore();
        done();
      });
  }, 10000);
});
