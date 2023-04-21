const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_URL = "https://findwork.dev/api/jobs/";

router.get("/jobs", async (req, res) => {
  const { location, search, sort_by } = req.query;
  const params = { location, search, sort_by };
  const headers = { Authorization: `Token ${process.env.REACT_APP_FINDWORK_API_KEY}` };

  try {
    const response = await axios.get(API_URL, { params, headers });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
