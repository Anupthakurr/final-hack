import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import userRoutes from '../src/routes/user.route.js'
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import cors from 'cors'
const app =express();
dotenv.config();
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Your Vite dev server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user',userRoutes)
app.use(errorHandler);
app.use(notFound)

export default app

