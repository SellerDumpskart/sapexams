const express = require('express');
const fs = require('fs');
const path = require('path');
// Load API key from env file
try { require('dotenv').config({ path: '/home/ubuntu/chittracker-api/.env' }); } catch(e) {}

const app = express();
app.use(express.json({ limit: '2mb' }));

const DATA_DIR = '/var/www/chittracker-data';
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ── CORS ──
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── Health ──
app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// ── Storage ──
app.get('/api/storage', (req, res) => {
  try {
    const prefix = req.query.prefix || '';
    const files = fs.readdirSync(DATA_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))
      .filter(k => k.startsWith(prefix));
    res.json({ keys: files });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/storage/:key', (req, res) => {
  try {
    const file = path.join(DATA_DIR, req.params.key + '.json');
    if (!fs.existsSync(file)) return res.status(404).json({ error: 'Not found' });
    const value = JSON.parse(fs.readFileSync(file, 'utf8'));
    res.json({ key: req.params.key, value });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/storage/:key', (req, res) => {
  try {
    const file = path.join(DATA_DIR, req.params.key + '.json');
    fs.writeFileSync(file, JSON.stringify(req.body.value));
    res.json({ ok: true, key: req.params.key });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/storage/:key', (req, res) => {
  try {
    const file = path.join(DATA_DIR, req.params.key + '.json');
    if (fs.existsSync(file)) fs.unlinkSync(file);
    res.json({ ok: true, key: req.params.key, deleted: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── AI Chat endpoint ──
app.post('/api/chat', async (req, res) => {
  try {
    const { question, context } = req.body;
    if (!question) return res.status(400).json({ error: 'No question' });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'AI not configured' });

    // Build system prompt with chit context
    const today = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
    const systemPrompt = `You are ChitTracker AI — a smart assistant for chit fund management in India.
Today is ${today}.

You help users understand their chit fund portfolio, predict auction bids, analyze profits, and make financial decisions.

USER'S CHIT DATA:
${context || 'No data provided'}

Rules:
- Answer concisely and specifically using the data above
- Use Indian number format (₹1,00,000 = 1 lakh)
- For bid predictions: suggest a range based on sarkar sawal formula
- For profit: calculate from auction discount shared among members
- Keep answers under 150 words
- If data is missing for a question, say so clearly
- Be helpful, not generic`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 300,
        temperature: 0.3,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(500).json({ error: err.error?.message || 'OpenAI error' });
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'No response';
    const tokens = data.usage?.total_tokens || 0;

    res.json({ answer, tokens });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = 3001;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`ChitTracker API running on port ${PORT}`);
});
