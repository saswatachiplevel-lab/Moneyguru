import { db } from './index.ts';
import { users, consultations, partnerInquiries } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export interface UserProfileUpdate {
  displayName?: string;
  phone?: string;
  riskAppetite?: string;
  primaryGoal?: string;
}

export async function getOrCreateUser(uid: string, email: string, displayName?: string, phone?: string) {
  try {
    const existing = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    if (existing.length > 0) {
      return existing[0];
    }
    const inserted = await db.insert(users).values({
      uid,
      email,
      displayName: displayName || 'Valued Investor',
      phone: phone || '',
      riskAppetite: 'Moderate',
      primaryGoal: 'Long-term Wealth Creation & Protection',
    }).returning();
    return inserted[0];
  } catch (error) {
    console.error('Database query failed in getOrCreateUser:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function getUserProfile(uid: string) {
  try {
    const result = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Database query failed in getUserProfile:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function updateUserProfile(uid: string, updates: UserProfileUpdate) {
  try {
    const updated = await db.update(users)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(users.uid, uid))
      .returning();
    return updated[0] || null;
  } catch (error) {
    console.error('Database query failed in updateUserProfile:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function createConsultation(data: {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredContact: string;
  message?: string;
}) {
  try {
    const inserted = await db.insert(consultations).values({
      userId: data.userId || 'guest',
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      preferredContact: data.preferredContact,
      message: data.message || '',
      status: 'pending',
    }).returning();
    return inserted[0];
  } catch (error) {
    console.error('Database query failed in createConsultation:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function getUserConsultations(userId: string) {
  try {
    return await db.select()
      .from(consultations)
      .where(eq(consultations.userId, userId))
      .orderBy(desc(consultations.createdAt));
  } catch (error) {
    console.error('Database query failed in getUserConsultations:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function createPartnerInquiry(data: {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
}) {
  try {
    const inserted = await db.insert(partnerInquiries).values({
      fullName: data.fullName,
      organization: data.organization,
      email: data.email,
      phone: data.phone,
      partnershipType: data.partnershipType,
      message: data.message,
      status: 'pending',
    }).returning();
    return inserted[0];
  } catch (error) {
    console.error('Database query failed in createPartnerInquiry:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}
