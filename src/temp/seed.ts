// npx prisma db seed
import 'dotenv/config';
import {
  PrismaClient,
  ItemType,
  ItemGrade,
  EquipmentSlot,
} from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';
import { PrismaPg } from '@prisma/adapter-pg';

interface RawItemCsvRow {
  name: string;
  description?: string;
  price: string;
  type: string;
  grade: string;
  slot?: string;
  stackable: string;
  maxStack?: string;
  sellable: string;
  iconUrl?: string;
}

const adapter = new PrismaPg({
  connectionString: process.env.POSTGRESQL_DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const items: RawItemCsvRow[] = [];

  await new Promise<void>((resolve) => {
    fs.createReadStream('./src/temp/ItemData.csv')
      .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
      .on('data', (row: RawItemCsvRow) => items.push(row))
      .on('end', resolve);
  });

  // 기존 데이터 삭제
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE game."Item" RESTART IDENTITY CASCADE`,
  );

  const data = items.map((row) => ({
    name: row.name,
    description: row.description || null,
    price: Number(row.price),
    type: row.type as ItemType,
    grade: row.grade as ItemGrade,
    slot: row.slot ? (row.slot as EquipmentSlot) : null,
    stackable: row.stackable === 'true',
    maxStack: row.maxStack ? Number(row.maxStack) : null,
    sellable: row.sellable === 'true',
    iconUrl: row.iconUrl || null,
  }));

  await prisma.item.createMany({
    data,
  });

  console.log('Seed 완료');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
