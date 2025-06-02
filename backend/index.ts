import express from 'express';
import { authMiddleware } from './middleware/auth';
import { corsMiddleware } from './config/cors';
import usersRouter from './routes/users';
import { env } from './config/env';

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

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
}); 