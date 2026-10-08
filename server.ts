import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
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
