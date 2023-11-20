import express from "express";
import bodyParser from "body-parser";

import axios from "axios";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const makeRequest = async (req, res) => {
  try {
    const openaiEndpoint = "https://api.openai.com/v1/chat/completions";
    const openaiApiKey = "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"; // Replace with your OpenAI API key

    const response = await axios.post(
      openaiEndpoint,
      {
        messages: [{ role: "user", content: req.body.question }],
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    console.log("API Response:", response.data);

    return res.status(200).json({
      data: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

app.post("/gpt", makeRequest);

app.listen(8080, () => console.log("listening"));
