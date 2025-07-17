'use server'

import { revalidatePath } from 'next/cache'
import { createPlantDb, deletePlantDB, editPlantDb } from '@/lib/prisma/plant'
import { plantSchema, PlantType } from '@/schemas/plantSchema'

export async function createPlant(values: PlantType) {
  const validatedFields = plantSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }

  try {
    await createPlantDb(values)
    revalidatePath('/')
    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof Error && error.message.toLowerCase().includes('slug already exists')) {
      return {
        error: 'A plant with this name already exists.',
      }
    }

    return {
      error: 'Something went wrong. Please try again.',
    }
  }
}

export async function editPlant(id: string, values: PlantType) {
  const validatedFields = plantSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }

  try {
    await editPlantDb(id, validatedFields.data)
    revalidatePath('/')
    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof Error && error.message.toLowerCase().includes('slug already exists')) {
      return {
        error: 'A plant with this name already exists.',
      }
    }

    return {
      error: 'Something went wrong. Please try again.',
    }
  }
}
export async function deleteBlog(id: string) {
  try {
    await deletePlantDB(id)
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return {
      error: 'Failed to delete blog. Please try again.',
    }
  }
}
