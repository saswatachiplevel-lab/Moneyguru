var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server.ts
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

// src/lib/firebase-admin.ts
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// firebase-applet-config.json
var firebase_applet_config_default = {
  projectId: "global-spring-6smzh",
  appId: "1:759586071745:web:338b6042bcfde96923a040",
  apiKey: "AIzaSyBKdOoMPYn1NsfDNlopZmkHNr87f9Y3Igs",
  authDomain: "global-spring-6smzh.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-6e64035b-2d84-4f36-88b4-23fe632b2439",
  storageBucket: "global-spring-6smzh.firebasestorage.app",
  messagingSenderId: "759586071745",
  measurementId: "",
  oAuthClientId: "759586071745-vig2hmpe6cjtt8t3f2s4orr2h9k5t2eo.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

// src/lib/firebase-admin.ts
if (!getApps().length) {
  initializeApp({
    projectId: firebase_applet_config_default.projectId
  });
}
var adminAuth = getAuth();

// src/middleware/auth.ts
var requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }
  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// src/db/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  consultations: () => consultations,
  partnerInquiries: () => partnerInquiries,
  users: () => users
});
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(),
  // Firebase Auth UID
  email: text("email").notNull(),
  displayName: text("display_name"),
  phone: text("phone"),
  riskAppetite: text("risk_appetite").default("Moderate"),
  primaryGoal: text("primary_goal").default("Long-term Wealth Creation & Protection"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  userId: text("user_id").default("guest"),
  // Firebase UID or guest
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  preferredContact: text("preferred_contact").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});
var partnerInquiries = pgTable("partner_inquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  organization: text("organization").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  partnershipType: text("partnership_type").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});

// src/db/index.ts
var createPool = () => {
  if (!global._postgresPool) {
    global._postgresPool = new Pool({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB_NAME,
      max: 10,
      connectionTimeoutMillis: 15e3
    });
    global._postgresPool.on("error", (err) => {
      console.error("Unexpected error on idle SQL pool client:", err);
    });
  }
  return global._postgresPool;
};
var pool = createPool();
var db = drizzle(pool, { schema: schema_exports });

// src/db/queries.ts
import { eq, desc } from "drizzle-orm";
async function getOrCreateUser(uid, email, displayName, phone) {
  try {
    const existing = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    if (existing.length > 0) {
      return existing[0];
    }
    const inserted = await db.insert(users).values({
      uid,
      email,
      displayName: displayName || "Valued Investor",
      phone: phone || "",
      riskAppetite: "Moderate",
      primaryGoal: "Long-term Wealth Creation & Protection"
    }).returning();
    return inserted[0];
  } catch (error) {
    console.error("Database query failed in getOrCreateUser:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}
async function getUserProfile(uid) {
  try {
    const result = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Database query failed in getUserProfile:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}
async function updateUserProfile(uid, updates) {
  try {
    const updated = await db.update(users).set({
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.uid, uid)).returning();
    return updated[0] || null;
  } catch (error) {
    console.error("Database query failed in updateUserProfile:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}
async function createConsultation(data) {
  try {
    const inserted = await db.insert(consultations).values({
      userId: data.userId || "guest",
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      preferredContact: data.preferredContact,
      message: data.message || "",
      status: "pending"
    }).returning();
    return inserted[0];
  } catch (error) {
    console.error("Database query failed in createConsultation:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}
async function getUserConsultations(userId) {
  try {
    return await db.select().from(consultations).where(eq(consultations.userId, userId)).orderBy(desc(consultations.createdAt));
  } catch (error) {
    console.error("Database query failed in getUserConsultations:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}
async function createPartnerInquiry(data) {
  try {
    const inserted = await db.insert(partnerInquiries).values({
      fullName: data.fullName,
      organization: data.organization,
      email: data.email,
      phone: data.phone,
      partnershipType: data.partnershipType,
      message: data.message,
      status: "pending"
    }).returning();
    return inserted[0];
  } catch (error) {
    console.error("Database query failed in createPartnerInquiry:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

// server.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3e3;
  app.use(express.json());
  app.post("/api/auth/sync", requireAuth, async (req, res) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const { email, displayName, phone } = req.body;
      const user = await getOrCreateUser(
        req.user.uid,
        email || req.user.email || "",
        displayName || req.user.name,
        phone
      );
      res.json({ success: true, user });
    } catch (error) {
      console.error("Failed to sync user:", error);
      res.status(500).json({ error: "Failed to sync user profile" });
    }
  });
  app.get("/api/user/profile", requireAuth, async (req, res) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const profile = await getUserProfile(req.user.uid);
      res.json({ success: true, profile });
    } catch (error) {
      console.error("Failed to get user profile:", error);
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  });
  app.put("/api/user/profile", requireAuth, async (req, res) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const { displayName, phone, riskAppetite, primaryGoal } = req.body;
      const updated = await updateUserProfile(req.user.uid, {
        displayName,
        phone,
        riskAppetite,
        primaryGoal
      });
      res.json({ success: true, profile: updated });
    } catch (error) {
      console.error("Failed to update user profile:", error);
      res.status(500).json({ error: "Failed to update user profile" });
    }
  });
  app.post("/api/consultations", async (req, res) => {
    try {
      const { name, email, phone, service, preferredContact, message, userId } = req.body;
      if (!name || !email || !phone || !service || !preferredContact) {
        return res.status(400).json({ error: "Missing required consultation fields" });
      }
      const record = await createConsultation({
        name,
        email,
        phone,
        service,
        preferredContact,
        message,
        userId: userId || "guest"
      });
      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Failed to create consultation:", error);
      res.status(500).json({ error: "Failed to submit consultation booking" });
    }
  });
  app.get("/api/user/consultations", requireAuth, async (req, res) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const bookings = await getUserConsultations(req.user.uid);
      res.json({ success: true, consultations: bookings });
    } catch (error) {
      console.error("Failed to fetch user consultations:", error);
      res.status(500).json({ error: "Failed to retrieve consultations" });
    }
  });
  app.post("/api/partner-inquiries", async (req, res) => {
    try {
      const { fullName, organization, email, phone, partnershipType, message } = req.body;
      if (!fullName || !organization || !email || !phone || !partnershipType || !message) {
        return res.status(400).json({ error: "Missing required partner inquiry fields" });
      }
      const record = await createPartnerInquiry({
        fullName,
        organization,
        email,
        phone,
        partnershipType,
        message
      });
      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Failed to create partner inquiry:", error);
      res.status(500).json({ error: "Failed to submit partner inquiry" });
    }
  });
  let cachedNews = null;
  let cacheTime = 0;
  let quotaCooldownUntil = 0;
  const CACHE_TTL_MS = 20 * 60 * 1e3;
  const FALLBACK_NEWS = [
    {
      id: "news-1",
      title: "Indian Benchmark Indices Advance as Nifty 50 Consolidates Near Record Highs",
      summary: "Domestic equity markets maintained firm ground led by steady institutional buying in banking, auto, and IT counters amid sustained domestic retail SIP inflows.",
      category: "Markets",
      source: "Economic Times",
      url: "https://economictimes.indiatimes.com/markets",
      time: "Live Update",
      impact: "Bullish"
    },
    {
      id: "news-2",
      title: "Monthly Mutual Fund SIP Inflows Touch New Milestone of \u20B923,500 Crore: AMFI",
      summary: "Association of Mutual Funds in India (AMFI) data highlights record systematic investment discipline among retail participants, with small-cap and flexi-cap categories drawing peak allocations.",
      category: "Mutual Funds",
      source: "Mint Markets",
      url: "https://www.livemint.com/mutual-fund",
      time: "2 hours ago",
      impact: "Bullish"
    },
    {
      id: "news-3",
      title: "RBI Monetary Policy Committee Maintains Focus on Inflation Alignment",
      summary: "The central bank reiterated its measured calibrated stance, projecting durable GDP growth while balancing liquidity buffers to support retail credit growth.",
      category: "Economy",
      source: "Business Standard",
      url: "https://www.business-standard.com/economy",
      time: "3 hours ago",
      impact: "Neutral"
    },
    {
      id: "news-4",
      title: "SEBI Streamlines Retail Investor KYC and Introduces Enhanced TER Transparency",
      summary: "Market regulator SEBI announced simplified uniform digital KYC protocols for mutual fund investors alongside sharper disclosure standards for fund management fees.",
      category: "Policy",
      source: "Moneycontrol",
      url: "https://www.moneycontrol.com/news/business/markets",
      time: "4 hours ago",
      impact: "Bullish"
    },
    {
      id: "news-5",
      title: "Global Crude Prices Moderate as Treasury Yields Stabilize Around 4.0%",
      summary: "Easing energy prices provide positive macroeconomic tailwinds for Indian fiscal balances and corporate operating margins heading into Q3 earnings.",
      category: "Commodities",
      source: "Reuters Financial",
      url: "https://www.reuters.com/markets",
      time: "5 hours ago",
      impact: "Bullish"
    },
    {
      id: "news-6",
      title: "Corporate Earnings Season Highlights Strong Balance Sheet Deleveraging",
      summary: "Early management commentaries signal healthy order books across capital goods, defense, and infrastructure developers, reassuring long-term equity wealth creators.",
      category: "Markets",
      source: "Financial Express",
      url: "https://www.financialexpress.com/market",
      time: "6 hours ago",
      impact: "Bullish"
    }
  ];
  app.get("/api/news", async (req, res) => {
    const forceRefresh = req.query.refresh === "true";
    const now = Date.now();
    if (!forceRefresh && cachedNews && now - cacheTime < CACHE_TTL_MS) {
      return res.json({
        success: true,
        grounded: cachedNews.grounded,
        cached: true,
        lastUpdated: new Date(cacheTime).toISOString(),
        news: cachedNews.news,
        searchQueries: cachedNews.searchQueries || []
      });
    }
    if (now < quotaCooldownUntil) {
      return res.json({
        success: true,
        grounded: false,
        cached: Boolean(cachedNews),
        lastUpdated: new Date(cacheTime || now).toISOString(),
        news: cachedNews?.news || FALLBACK_NEWS,
        searchQueries: ["Nifty 50 live updates", "Mutual fund SIP inflows India"]
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
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      const responseText = response.text || "";
      const cleanedJson = responseText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
      const searchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];
      let parsedNews = [];
      try {
        parsedNews = JSON.parse(cleanedJson);
      } catch {
        const match = cleanedJson.match(/\[[\s\S]*\]/);
        if (match) {
          try {
            parsedNews = JSON.parse(match[0]);
          } catch {
          }
        }
      }
      if (Array.isArray(parsedNews) && parsedNews.length > 0) {
        cachedNews = {
          grounded: true,
          news: parsedNews,
          searchQueries
        };
        cacheTime = now;
        return res.json({
          success: true,
          grounded: true,
          cached: false,
          lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
          news: parsedNews,
          searchQueries
        });
      }
      throw new Error("No valid news array received from model");
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error);
      if (errMessage.includes("429") || errMessage.includes("RESOURCE_EXHAUSTED")) {
        quotaCooldownUntil = now + 60 * 60 * 1e3;
      }
      cachedNews = {
        grounded: false,
        news: FALLBACK_NEWS,
        searchQueries: ["Nifty 50 today live news", "Mutual fund SIP inflows India AMFI"]
      };
      cacheTime = now;
      return res.json({
        success: true,
        grounded: false,
        fallback: true,
        lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
        news: FALLBACK_NEWS,
        searchQueries: ["Nifty 50 today live news", "Mutual fund SIP inflows India AMFI"]
      });
    }
  });
  const distPath = path.resolve(__dirname, "dist");
  const isDev = process.env.NODE_ENV === "development" || !fs.existsSync(distPath);
  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      const indexPath = path.resolve(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send("Moneyguru Financial Services is starting...");
      }
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
