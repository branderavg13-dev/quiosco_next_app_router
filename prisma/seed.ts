import {categories} from './data/categories'
import {products} from './data/products'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'


const adapter = new PrismaPg({ connectionString: "postgresql://neondb_owner:npg_BD7eEo0nkGzV@ep-plain-cake-bef90ts8-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require" })
const prisma = new PrismaClient({ adapter })

async function main() {
  try{
    await prisma.category.createMany({
      data: categories
    })
    await prisma.product.createMany({
      data: products.map(product => ({
        ...product,
        description: ''
      }))
    })
    console.log('Seed Ejecutado Correctamente')
  } catch (error) {
    console.log(error)
  }
}

main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})