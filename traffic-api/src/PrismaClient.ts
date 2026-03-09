import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Ensure env vars are loaded before client instantiation
dotenv.config();

const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prismaClient;