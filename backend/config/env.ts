import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Verify required environment variables
const requiredEnvVars = ['FIREBASE_ADMIN_CREDENTIALS', 'PORT'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const env = {
  firebaseCredentials: process.env.FIREBASE_ADMIN_CREDENTIALS,
  port: process.env.PORT
}; 