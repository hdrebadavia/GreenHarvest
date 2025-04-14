const axios = require("axios");
require("dotenv").config();

const askOpenAI = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const translatePrompt = `You are a grammar checker that replies with HTML. Highlight corrections and explanations using HTML formatting.
            Please provide a review on the text and suggest edits if necessary. Please provide a "grammar score" as well.`;

  try {
    const response = await axios.post(
      "https://is215-openai.upou.io/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: translatePrompt },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer rebadavia-d8f1HS8rob`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "Something went wrong while calling the OpenAI API" });
  }
};

module.exports = { askOpenAI };
