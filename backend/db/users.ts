import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

interface UserData {
  uid: string;
  email?: string;
  createdAt: Date;
}

export const getUser = async (uid: string): Promise<UserData | null> => {
  try {
    console.log('Getting user:', uid);
    const userDoc = await db.collection('users').doc(uid).get();
    const userData = userDoc.exists ? (userDoc.data() as UserData) : null;
    console.log('Retrieved user data:', userData);
    return userData;
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Failed to get user');
  }
};

export const createUser = async (userData: Omit<UserData, 'createdAt'>): Promise<{ created: boolean }> => {
  try {
    console.log('Creating user with data:', userData);
    const userRef = db.collection('users').doc(userData.uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      console.log('User already exists:', userData.uid);
      return { created: false };
    }

    const userDataWithTimestamp = {
      ...userData,
      createdAt: new Date(),
    };
    console.log('Setting user data with timestamp:', userDataWithTimestamp);

    await userRef.set(userDataWithTimestamp);
    console.log('User created successfully:', userData.uid);

    return { created: true };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}; 