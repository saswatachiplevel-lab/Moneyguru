import { auth } from './firebase.ts';

async function getAuthHeader(): Promise<Record<string, string>> {
  const user = auth.currentUser;
  if (!user) return {};
  try {
    const token = await user.getIdToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  } catch {
    return {};
  }
}

export interface SqlUserProfile {
  id?: number;
  uid: string;
  email: string;
  displayName?: string | null;
  phone?: string | null;
  riskAppetite?: string | null;
  primaryGoal?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface SqlConsultation {
  id?: number;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredContact: string;
  message?: string;
  status: string;
  createdAt?: string;
}

export async function syncUserWithSqlBackend(): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const headers = await getAuthHeader();
    await fetch('/api/auth/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        email: user.email,
        displayName: user.displayName,
        phone: user.phoneNumber,
      }),
    });
  } catch (err) {
    console.warn('Could not sync user with PostgreSQL backend:', err);
  }
}

export async function getSqlUserProfile(): Promise<SqlUserProfile | null> {
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/user/profile', { headers });
    if (!res.ok) return null;
    const data = await res.json();
    return data.profile || null;
  } catch (err) {
    console.warn('Could not fetch user profile from Cloud SQL:', err);
    return null;
  }
}

export async function updateSqlUserProfile(updates: {
  displayName?: string;
  phone?: string;
  riskAppetite?: string;
  primaryGoal?: string;
}): Promise<SqlUserProfile | null> {
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.profile || null;
  } catch (err) {
    console.warn('Could not update user profile in Cloud SQL:', err);
    return null;
  }
}

export async function createSqlConsultation(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredContact: string;
  message?: string;
  userId?: string;
}): Promise<number | null> {
  try {
    const res = await fetch('/api/consultations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const resData = await res.json();
    return resData.id || null;
  } catch (err) {
    console.warn('Could not save consultation to Cloud SQL:', err);
    return null;
  }
}

export async function getSqlUserConsultations(): Promise<SqlConsultation[]> {
  try {
    const headers = await getAuthHeader();
    const res = await fetch('/api/user/consultations', { headers });
    if (!res.ok) return [];
    const data = await res.json();
    return data.consultations || [];
  } catch (err) {
    console.warn('Could not fetch consultations from Cloud SQL:', err);
    return [];
  }
}

export async function createSqlPartnerInquiry(data: {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
}): Promise<number | null> {
  try {
    const res = await fetch('/api/partner-inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const resData = await res.json();
    return resData.id || null;
  } catch (err) {
    console.warn('Could not save partner inquiry to Cloud SQL:', err);
    return null;
  }
}
