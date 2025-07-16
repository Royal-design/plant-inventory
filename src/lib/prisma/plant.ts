import { plantSchema } from '@/schemas/plantSchema'
import prisma from '../prisma'
import z from 'zod'

type CreatePlantProps = z.infer<typeof plantSchema>

export async function createPlantDb(values: CreatePlantProps) {
  const slug = values.name.toLowerCase().replace(/\s+/g, '-')
  const existing = await prisma.plant.findUnique({ where: { slug } })

  if (existing) {
    throw new Error('Slug already exists')
  }
  return await prisma.plant.create({
    data: {
      ...values,
      slug,
    },
  })
}

export async function editPlantDb(id: string, values: CreatePlantProps) {
  const slug = values.name.toLowerCase().replace(/\s+/g, '-')
  const existing = await prisma.plant.findUnique({ where: { slug } })

  if (existing && existing.id !== id) {
    throw new Error('Slug already exists')
  }

  return await prisma.plant.update({
    where: { id },
    data: {
      ...values,
      slug,
    },
  })
}

export async function deletePlantDB(id: string) {
  return await prisma.plant.delete({
    where: { id },
  })
}
