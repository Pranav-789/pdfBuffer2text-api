const express = require('express');
const pdf = require('pdf-parse');

const app = express();
const PORT = 3000;

// Raw body parser for application/pdf
app.use('/convert', express.raw({ type: 'application/pdf', limit: '10mb' }));

app.post('/convert', async (req, res) => {
  try {
    const buffer = req.body;

    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ success: false, message: 'No PDF buffer received.' });
    }

    const data = await pdf(buffer);
    res.json({ success: true, text: data.text });
  } catch (err) {
    console.error('PDF parsing error:', err);
    res.status(500).json({ success: false, message: 'Failed to extract text.', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
