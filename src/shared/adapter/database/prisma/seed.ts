import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
  await prisma.category.upsert({
    where: { name: 'Lanche' },
    update: {},
    create: {
      name: 'Lanche',
    },
  });

  await prisma.category.upsert({
    where: { name: 'Acompanhamento' },
    update: {},
    create: {
      name: 'Acompanhamento',
    },
  });

  await prisma.category.upsert({
    where: { name: 'Bebida' },
    update: {},
    create: {
      name: 'Bebida',
    },
  });

  await prisma.category.upsert({
    where: { name: 'Sobremesa' },
    update: {},
    create: {
      name: 'Sobremesa',
    },
  });
}

async function seedStatus() {
  await prisma.status.upsert({
    where: { description: 'Recebido' },
    update: {},
    create: {
      description: 'Recebido',
    },
  });

  await prisma.status.upsert({
    where: { description: 'Em preparação' },
    update: {},
    create: {
      description: 'Em preparação',
    },
  });

  await prisma.status.upsert({
    where: { description: 'Pronto' },
    update: {},
    create: {
      description: 'Pronto',
    },
  });

  await prisma.status.upsert({
    where: { description: 'Finalizado' },
    update: {},
    create: {
      description: 'Finalizado',
    },
  });
}

async function main() {
  await seedCategories();

  await seedStatus();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed successful');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
