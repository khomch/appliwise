import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function prismaMain() {
  //   const allUsers = await prisma.user.findMany();
  //   console.log(allUsers);
}

export { prisma, prismaMain };
