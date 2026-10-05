import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// AI Mining Optimizer Endpoint
app.post('/api/ai-advisor', async (req, res) => {
  try {
    const { totalHashRateGHs, openBalance, batteryPercent, activeMultiplier } = req.body;

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured
      return res.json({
        advice: `⚡ **Node Diagnostic Status: Optimal**\n\n1. **Hash Distribution**: Your current ${totalHashRateGHs} GH/s hash rate is operating at 99.8% thermal efficiency.\n2. **Energy Vault**: Battery is at ${batteryPercent}%. Keep energy topped up above 80% to maximize block discovery rate.\n3. **Boost Strategy**: Activate Quantum Power Boosters during peak network pool hours to scale your ${activeMultiplier}x multiplier.`
      });
    }

    const prompt = `You are Royalty Vault AI — an elite cybernetic Bitcoin and Cloud Mining Telemetry Assistant.
User's Current Mining Node Stats:
- Total Hash Rate: ${totalHashRateGHs} GH/s
- Token Balance: ${openBalance} ROYAL
- Vault Battery Health: ${batteryPercent}%
- Current Active Multiplier: ${activeMultiplier}x

Provide a 3-bullet concise, high-tech, futuristic mining strategy & hardware optimization recommendation for this user. Keep it brief, actionable, encouraging, and written in a cool cyberpunk crypto tone. Format in clean markdown with bullet points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt
    });

    const text = response.text || 'Core diagnostic complete. Systems optimal.';
    res.json({ advice: text });
  } catch (err: any) {
    console.error('AI Advisor Error:', err);
    res.json({
      advice: `⚡ **Node Diagnostic Status: Operational**\n\n• **Core Health**: Battery energy level optimal.\n• **Hardware Rec**: Level up your ASIC rigs in the Workshop for higher passive yield.\n• **Squad Boost**: Invite squad partners for an instant +15% hash boost per node.`
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Royalty Mining Server running on port ${PORT}`);
  });
}

startServer();
