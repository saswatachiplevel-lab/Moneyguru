import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDocFromServer,
  addDoc,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  syncUserWithSqlBackend,
  createSqlConsultation,
  createSqlPartnerInquiry,
  updateSqlUserProfile
} from './api.ts';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
/* CRITICAL: The app will break without this line */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Test connection on boot per Firebase skill guidelines
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or internet connection.");
    }
    // Return true/false without crashing client
    return false;
  }
}
testConnection();

// Error Handling per Firebase Integration Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Authentication Helpers
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function loginWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Initialize or update user profile doc in Firestore and PostgreSQL
    if (result.user) {
      await Promise.allSettled([
        syncUserProfile(result.user),
        syncUserWithSqlBackend(),
      ]);
    }
    return result.user;
  } catch (err: unknown) {
    console.error('Google Sign In Error:', err);
    throw err;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// Consultation Data Types & API
export interface ConsultationBooking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredContact: 'Phone' | 'Email' | 'WhatsApp';
  message: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed';
  userId?: string;
  createdAt: string;
}

export async function submitConsultation(data: Omit<ConsultationBooking, 'id' | 'status' | 'createdAt'>): Promise<string> {
  const path = 'consultations';
  try {
    const payload: ConsultationBooking = {
      ...data,
      status: 'pending',
      userId: auth.currentUser?.uid || 'guest',
      createdAt: new Date().toISOString(),
    };
    const ref = await addDoc(collection(db, path), payload);
    // Also persist to PostgreSQL Cloud SQL backend
    createSqlConsultation({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      preferredContact: data.preferredContact,
      message: data.message,
      userId: payload.userId,
    }).catch(err => console.warn('SQL consultation sync background warning:', err));
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function getUserConsultations(userId: string): Promise<ConsultationBooking[]> {
  const path = 'consultations';
  try {
    const q = query(collection(db, path), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    } as ConsultationBooking));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// Partner Inquiry Types & API
export interface PartnerInquiryData {
  id?: string;
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
  status?: string;
  userId?: string;
  createdAt?: string;
}

export async function submitPartnerInquiry(data: Omit<PartnerInquiryData, 'id' | 'status' | 'createdAt'>): Promise<string> {
  const path = 'partnerInquiries';
  try {
    const payload: PartnerInquiryData = {
      ...data,
      status: 'pending',
      userId: auth.currentUser?.uid || 'guest',
      createdAt: new Date().toISOString(),
    };
    const ref = await addDoc(collection(db, path), payload);
    // Also persist to PostgreSQL Cloud SQL backend
    createSqlPartnerInquiry({
      fullName: data.fullName,
      organization: data.organization,
      email: data.email,
      phone: data.phone,
      partnershipType: data.partnershipType,
      message: data.message,
    }).catch(err => console.warn('SQL partner inquiry sync background warning:', err));
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// User Profile Types & API
export interface UserProfile {
  userId: string;
  displayName: string;
  email: string;
  phone?: string;
  riskAppetite?: 'Conservative' | 'Moderate' | 'Aggressive' | 'Not Sure';
  primaryGoal?: string;
  savedArticleIds?: string[];
  updatedAt: string;
}

export async function syncUserProfile(user: User): Promise<void> {
  const path = `userProfiles/${user.uid}`;
  try {
    const ref = doc(db, 'userProfiles', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const newProfile: UserProfile = {
        userId: user.uid,
        displayName: user.displayName || 'Valued Investor',
        email: user.email || '',
        phone: user.phoneNumber || '',
        riskAppetite: 'Moderate',
        primaryGoal: 'Long-term Wealth Creation & Protection',
        savedArticleIds: [],
        updatedAt: new Date().toISOString()
      };
      await setDoc(ref, newProfile);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const path = `userProfiles/${userId}`;
  try {
    const ref = doc(db, 'userProfiles', userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
  const path = `userProfiles/${userId}`;
  try {
    const ref = doc(db, 'userProfiles', userId);
    await setDoc(ref, {
      ...updates,
      userId,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    // Also persist profile updates to PostgreSQL Cloud SQL
    updateSqlUserProfile({
      displayName: updates.displayName,
      phone: updates.phone,
      riskAppetite: updates.riskAppetite,
      primaryGoal: updates.primaryGoal,
    }).catch(err => console.warn('SQL profile sync background warning:', err));
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
