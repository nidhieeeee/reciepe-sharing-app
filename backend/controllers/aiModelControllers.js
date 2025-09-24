const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.generateRecipe = async (req, res) => {
  const recipeName = req.body.recipeName;

  const prompt = `
    You are a strict recipe assistant.

    1. ONLY respond if the given input is a real, well-known dish name.
    2. If it is a valid dish, reply strictly in the following JSON format:
    {
    "title": "<Dish Name>",
    "description": "<One line about the dish>",
    "instructions": ["Step 1", "Step 2", "Step 3", ...],
    "ingredients": ["Ingredient 1", "Ingredient 2", ...],
    }

    Make sure you never hallucinate or guess a dish.

    Input Dish: ${recipeName}
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const textResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      return res.status(500).json({ error: "No valid response from Gemini API" });
    }

    // console.log(textResponse);

    // const jsonResponse = JSON.parse(textResponse); // because Gemini sends a JSON inside a text
    // res.json(jsonResponse);

        // Extract the JSON part using regex
        const match = textResponse.match(/\{[\s\S]*\}/); // matches first {...} block
        if (!match) {
          return res.status(500).json({ error: "Invalid JSON format received" });
        }
    
        const jsonString = match[0];
        const jsonResponse = JSON.parse(jsonString);
    

        console.log(jsonResponse);
        res.json(jsonResponse);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

