import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

interface UserData {
  uid: string;
  email?: string;
  createdAt: Date;
}

export const getUser = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    return userDoc.exists ? (userDoc.data() as UserData) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Failed to get user');
  }
};

export const createUser = async (userData: Omit<UserData, 'createdAt'>): Promise<{ created: boolean }> => {
  try {
    const userRef = db.collection('users').doc(userData.uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return { created: false };
    }

    await userRef.set({
      ...userData,
      createdAt: new Date(),
    });

    return { created: true };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}; 