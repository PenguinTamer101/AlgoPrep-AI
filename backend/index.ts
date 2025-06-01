import express from 'express';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/auth';
import { corsMiddleware } from './config/cors';
import usersRouter from './routes/users';

dotenv.config();

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);

// Verify authentication
app.get('/', authMiddleware, (req, res) => {
  res.json({ 
    message: 'Authenticated successfully',
    user: req.user 
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 