import { PrismaClient } from '@prisma/client';

// Singleton pattern to avoid exhausting database connections during
// hot reloads in development. See: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient();
  }
  prisma = global.prismaGlobal;
}

export default prisma;