import cors from 'cors';

// Basic CORS configuration
const corsOptions: cors.CorsOptions = {
  // Allow requests from your frontend domain
  origin: process.env.FRONTEND_URL,
  
  // Allow credentials (cookies, authorization headers)
  credentials: true,

  // Allowed HTTP methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  
  // Allowed headers
  allowedHeaders: ['Content-Type', 'Authorization'],

  // Optional configurations for future use:
  // maxAge: 86400, // Cache preflight requests for 24 hours
  // exposedHeaders: ['Custom-Header'], // Headers exposed to the browser
  // preflightContinue: false, // Handle preflight requests
};

export const corsMiddleware = cors(corsOptions); 