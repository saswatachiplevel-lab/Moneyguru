import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import {
  getOrCreateUser,
  getUserProfile,
  updateUserProfile,
  createConsultation,
  getUserConsultations,
  createPartnerInquiry
} from './src/db/queries.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  // 1. User Sync on Login
  app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const { email, displayName, phone } = req.body;
      const user = await getOrCreateUser(
        req.user.uid,
        email || req.user.email || '',
        displayName || req.user.name,
        phone
      );
      res.json({ success: true, user });
    } catch (error: unknown) {
      console.error('Failed to sync user:', error);
      res.status(500).json({ error: 'Failed to sync user profile' });
    }
  });

  // 2. Get User Profile
  app.get('/api/user/profile', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const profile = await getUserProfile(req.user.uid);
      res.json({ success: true, profile });
    } catch (error: unknown) {
      console.error('Failed to get user profile:', error);
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  });

  // 3. Update User Profile
  app.put('/api/user/profile', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const { displayName, phone, riskAppetite, primaryGoal } = req.body;
      const updated = await updateUserProfile(req.user.uid, {
        displayName,
        phone,
        riskAppetite,
        primaryGoal,
      });
      res.json({ success: true, profile: updated });
    } catch (error: unknown) {
      console.error('Failed to update user profile:', error);
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  });

  // 4. Submit Consultation (Public or Authenticated)
  app.post('/api/consultations', async (req, res) => {
    try {
      const { name, email, phone, service, preferredContact, message, userId } = req.body;
      if (!name || !email || !phone || !service || !preferredContact) {
        return res.status(400).json({ error: 'Missing required consultation fields' });
      }
      const record = await createConsultation({
        name,
        email,
        phone,
        service,
        preferredContact,
        message,
        userId: userId || 'guest',
      });
      res.json({ success: true, id: record.id });
    } catch (error: unknown) {
      console.error('Failed to create consultation:', error);
      res.status(500).json({ error: 'Failed to submit consultation booking' });
    }
  });

  // 5. Get User Consultations
  app.get('/api/user/consultations', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const bookings = await getUserConsultations(req.user.uid);
      res.json({ success: true, consultations: bookings });
    } catch (error: unknown) {
      console.error('Failed to fetch user consultations:', error);
      res.status(500).json({ error: 'Failed to retrieve consultations' });
    }
  });

  // 6. Submit Partner Inquiry
  app.post('/api/partner-inquiries', async (req, res) => {
    try {
      const { fullName, organization, email, phone, partnershipType, message } = req.body;
      if (!fullName || !organization || !email || !phone || !partnershipType || !message) {
        return res.status(400).json({ error: 'Missing required partner inquiry fields' });
      }
      const record = await createPartnerInquiry({
        fullName,
        organization,
        email,
        phone,
        partnershipType,
        message,
      });
      res.json({ success: true, id: record.id });
    } catch (error: unknown) {
      console.error('Failed to create partner inquiry:', error);
      res.status(500).json({ error: 'Failed to submit partner inquiry' });
    }
  });

  // 7. Google Search Grounded Financial News Feed
  let cachedNews: { grounded: boolean; news: unknown[]; searchQueries: string[] } | null = null;
  let cacheTime = 0;
  let quotaCooldownUntil = 0;
  const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes

  const FALLBACK_NEWS = [
    {
      id: 'news-1',
      title: 'Indian Benchmark Indices Advance as Nifty 50 Consolidates Near Record Highs',
      summary: 'Domestic equity markets maintained firm ground led by steady institutional buying in banking, auto, and IT counters amid sustained domestic retail SIP inflows.',
      category: 'Markets',
      source: 'Economic Times',
      url: 'https://economictimes.indiatimes.com/markets',
      time: 'Live Update',
      impact: 'Bullish',
    },
    {
      id: 'news-2',
      title: 'Monthly Mutual Fund SIP Inflows Touch New Milestone of ₹23,500 Crore: AMFI',
      summary: 'Association of Mutual Funds in India (AMFI) data highlights record systematic investment discipline among retail participants, with small-cap and flexi-cap categories drawing peak allocations.',
      category: 'Mutual Funds',
      source: 'Mint Markets',
      url: 'https://www.livemint.com/mutual-fund',
      time: '2 hours ago',
      impact: 'Bullish',
    },
    {
      id: 'news-3',
      title: 'RBI Monetary Policy Committee Maintains Focus on Inflation Alignment',
      summary: 'The central bank reiterated its measured calibrated stance, projecting durable GDP growth while balancing liquidity buffers to support retail credit growth.',
      category: 'Economy',
      source: 'Business Standard',
      url: 'https://www.business-standard.com/economy',
      time: '3 hours ago',
      impact: 'Neutral',
    },
    {
      id: 'news-4',
      title: 'SEBI Streamlines Retail Investor KYC and Introduces Enhanced TER Transparency',
      summary: 'Market regulator SEBI announced simplified uniform digital KYC protocols for mutual fund investors alongside sharper disclosure standards for fund management fees.',
      category: 'Policy',
      source: 'Moneycontrol',
      url: 'https://www.moneycontrol.com/news/business/markets',
      time: '4 hours ago',
      impact: 'Bullish',
    },
    {
      id: 'news-5',
      title: 'Global Crude Prices Moderate as Treasury Yields Stabilize Around 4.0%',
      summary: 'Easing energy prices provide positive macroeconomic tailwinds for Indian fiscal balances and corporate operating margins heading into Q3 earnings.',
      category: 'Commodities',
      source: 'Reuters Financial',
      url: 'https://www.reuters.com/markets',
      time: '5 hours ago',
      impact: 'Bullish',
    },
    {
      id: 'news-6',
      title: 'Corporate Earnings Season Highlights Strong Balance Sheet Deleveraging',
      summary: 'Early management commentaries signal healthy order books across capital goods, defense, and infrastructure developers, reassuring long-term equity wealth creators.',
      category: 'Markets',
      source: 'Financial Express',
      url: 'https://www.financialexpress.com/market',
      time: '6 hours ago',
      impact: 'Bullish',
    },
  ];

  app.get('/api/news', async (req, res) => {
    const forceRefresh = req.query.refresh === 'true';
    const now = Date.now();

    // Serve from cache if still within TTL and not a force refresh
    if (!forceRefresh && cachedNews && now - cacheTime < CACHE_TTL_MS) {
      return res.json({
        success: true,
        grounded: cachedNews.grounded,
        cached: true,
        lastUpdated: new Date(cacheTime).toISOString(),
        news: cachedNews.news,
        searchQueries: cachedNews.searchQueries || [],
      });
    }

    // If quota cooldown is currently active, serve cached or curated headlines directly without hitting the API
    if (now < quotaCooldownUntil) {
      return res.json({
        success: true,
        grounded: false,
        cached: Boolean(cachedNews),
        lastUpdated: new Date(cacheTime || now).toISOString(),
        news: cachedNews?.news || FALLBACK_NEWS,
        searchQueries: ['Nifty 50 live updates', 'Mutual fund SIP inflows India'],
      });
    }

    try {
      const ai = new GoogleGenAI();
      const prompt = `Search for the latest today's financial, stock market, mutual funds, and economic headlines in India (Nifty 50, Sensex, RBI, SEBI, mutual fund SIPs, commodities).
Provide 5 to 6 recent, high-impact news headlines with analysis.
Format your answer strictly as a valid JSON array of objects with the following keys:
- "id": string (e.g. "news-1")
- "title": string (concise headline)
- "summary": string (2 clear sentences explaining the development and what it means for retail investors)
- "category": string (one of "Markets", "Mutual Funds", "Economy", "Banking", "Policy", "Commodities")
- "source": string (publisher name, e.g. "Economic Times", "Mint", "Moneycontrol", "Reuters", "Business Standard")
- "url": string (source URL if found, or homepage of publication)
- "time": string (e.g. "Today", "1 hour ago", "Live Update")
- "impact": string ("Bullish", "Bearish", or "Neutral")

Respond with ONLY the raw JSON array. Do not include markdown code block backticks or commentary.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const responseText = response.text || '';
      const cleanedJson = responseText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

      const searchQueries: string[] =
        response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

      let parsedNews: unknown[] = [];
      try {
        parsedNews = JSON.parse(cleanedJson);
      } catch {
        const match = cleanedJson.match(/\[[\s\S]*\]/);
        if (match) {
          try {
            parsedNews = JSON.parse(match[0]);
          } catch {
            // Handled below
          }
        }
      }

      if (Array.isArray(parsedNews) && parsedNews.length > 0) {
        cachedNews = {
          grounded: true,
          news: parsedNews,
          searchQueries,
        };
        cacheTime = now;

        return res.json({
          success: true,
          grounded: true,
          cached: false,
          lastUpdated: new Date().toISOString(),
          news: parsedNews,
          searchQueries,
        });
      }

      throw new Error('No valid news array received from model');
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : String(error);
      if (errMessage.includes('429') || errMessage.includes('RESOURCE_EXHAUSTED')) {
        // Activate cooldown for 1 hour so we do not repeatedly exhaust quota
        quotaCooldownUntil = now + 60 * 60 * 1000;
      }

      cachedNews = {
        grounded: false,
        news: FALLBACK_NEWS,
        searchQueries: ['Nifty 50 today live news', 'Mutual fund SIP inflows India AMFI'],
      };
      cacheTime = now;

      return res.json({
        success: true,
        grounded: false,
        fallback: true,
        lastUpdated: new Date().toISOString(),
        news: FALLBACK_NEWS,
        searchQueries: ['Nifty 50 today live news', 'Mutual fund SIP inflows India AMFI'],
      });
    }
  });

  // Vite middleware in dev or static files in production
  const distPath = path.resolve(__dirname, 'dist');
  const isDev = process.env.NODE_ENV === 'development' || !fs.existsSync(distPath);

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      const indexPath = path.resolve(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send('Moneyguru Financial Services is starting...');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
