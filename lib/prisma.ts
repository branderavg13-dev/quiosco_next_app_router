import { PrismaClient } from '@/src/generated/prisma'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// 1. Configuramos el Pool de conexiones usando tu URL de Neon
const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })

// 2. Le pasamos el Pool al adaptador de Prisma
const adapter = new PrismaPg(pool)

// 3. Inicializamos Prisma con el adaptador configurado
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma