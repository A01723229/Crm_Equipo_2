require('dotenv').config();

const postGemini = async (req, res) => {
  const { data, question } = req.body;

  if (!data || !question) {
    return res.status(400).json({ error: 'Missing data or question in request body.' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API}`;

  const prompt = `
    Here is the JSON data provided:

    ${JSON.stringify(data, null, 2)}

    Answer the following question about this data clearly and concisely:

    ${question}
  `;

  try {
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }],
        }],
      }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.text();
      console.error('Gemini API response error:', errorData);
      return res.status(apiResponse.status).json({ error: 'Gemini API request failed.' });
    }

    const geminiData = await apiResponse.json();
    const answer = geminiData.candidates[0].content.parts[0].text;

    res.json({ answer });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Internal server error during Gemini API request.' });
  }
};

module.exports = postGemini;