import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { createUser, getUser } from '../db/users';

const router = Router();

// Protected route - only authenticated users can create their profile
router.post('/profile', authMiddleware, async (req, res): Promise<void> => {
  try {
    if (!req.user) {
      console.log('No user found in request');
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const { created } = await createUser({
      uid: req.user.uid,
      email: req.user.email
    });

    console.log('User creation result:', { created, uid: req.user.uid });

    if (created) {
      res.status(201).json({ message: 'User profile created successfully' });
    } else {
      res.status(200).json({ message: 'User profile already exists' });
    }
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Failed to create user profile' });
  }
});

export default router; 