
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    console.log('Attempting to connect to database...');
    console.log(`URL: ${process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@')}`); // Hide password
    await prisma.$connect();
    console.log('Successfully connected to database!');
    const userCount = await prisma.user.count();
    console.log(`User count: ${userCount}`);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
