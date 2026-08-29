const express = require('express');
const router = express.Router();

router.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 500,
        system: 'You are MedAssist AI, a clinical intake assistant embedded in a Patient Case Taking Module. Help staff correctly document vitals, allergies, and history.',
        messages: [...(history || []), { role: 'user', content: message }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(500).json({ reply: "Error from AI service." });
    }

    const reply = data.content?.[0]?.text || "Sorry, I couldn't process that.";
    res.json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    res.status(500).json({ reply: "Error contacting AI service." });
  }
});

module.exports = router;