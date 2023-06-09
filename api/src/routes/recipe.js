const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
router.post("/recipe", async (req, res) => {
    try {

        const prompt = generatePrompt(req.body);

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.6,
            max_tokens: 256,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    }
    catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
          } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
              error: {
                message: 'An error occurred during your request.',
              }
            });
          }
    }

});
function generatePrompt({gpa, testscore, extracurriculars, experience, comment}) {
  return "I have a gpa of " + gpa + " and a test score of " + testscore + " and extracurriculars of " + extracurriculars + ". " + comment + ". \
  I have experience: " + experience+". Can you recommend how to improve my profile? \n";
    // return "suggesstion for a student have gpa 4.0 and want to get into big company like google, facebook, amazon, apple, microsoft, etc. Be brief and concise. \n";
}

module.exports = router;
