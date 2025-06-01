import * as admin from 'firebase-admin';
import serviceAccount from '../serviceAccount.json';
import { ServiceAccount } from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export const auth = admin.auth();
export const db = admin.firestore();

// Helper function to verify Firebase ID token
export async function verifyIdToken(token: string) {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
} 