import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

if (!process.env.FIREBASE_ADMIN_CREDENTIALS) {
  throw new Error('FIREBASE_ADMIN_CREDENTIALS is not set');
}

// Decode the base64 credentials
const serviceAccount: ServiceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS, 'base64').toString()
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
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