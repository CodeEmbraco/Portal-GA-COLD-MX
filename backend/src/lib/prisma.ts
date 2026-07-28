import { PrismaClient } from '../generated/prisma'; 
import { PrismaMssql } from '@prisma/adapter-mssql';

const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaMssql( connectionString );

// Exportamos UNA SOLA instancia para toda la app
export const prisma = new PrismaClient({ adapter });