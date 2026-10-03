import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table storing Firebase Auth authenticated investor profiles
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  phone: text('phone'),
  riskAppetite: text('risk_appetite').default('Moderate'),
  primaryGoal: text('primary_goal').default('Long-term Wealth Creation & Protection'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Consultations table storing advisory bookings
export const consultations = pgTable('consultations', {
  id: serial('id').primaryKey(),
  userId: text('user_id').default('guest'), // Firebase UID or guest
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  service: text('service').notNull(),
  preferredContact: text('preferred_contact').notNull(),
  message: text('message'),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Partner inquiries table storing collaboration proposals
export const partnerInquiries = pgTable('partner_inquiries', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  organization: text('organization').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  partnershipType: text('partnership_type').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});
