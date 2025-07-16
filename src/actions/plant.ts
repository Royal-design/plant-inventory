'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createPlantDb, deletePlantDB, editPlantDb } from '@/lib/prisma/plant'
import { plantSchema } from '@/schemas/plantSchema'

export type PlantFieldErrors = Partial<Record<keyof z.infer<typeof plantSchema>, string[]>>

export type PlantStateProps = {
  message: boolean
  errors: PlantFieldErrors
}

export async function createPlant(
  _: PlantStateProps,
  formData: FormData
): Promise<PlantStateProps> {
  const rawData = Object.fromEntries(formData)
  const result = plantSchema.safeParse(rawData)

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors

    return {
      message: false,
      errors: fieldErrors,
    }
  }

  try {
    await createPlantDb(result.data)
    revalidatePath('/')
    return {
      message: true,
      errors: {},
    }
  } catch (error) {
    if (error instanceof Error && error.message.toLowerCase().includes('slug already exists')) {
      return {
        message: false,
        errors: {
          name: ['A plant with this name already exists.'],
        },
      }
    }

    throw error
  }
}

export async function editPlant(
  id: string,
  _: PlantStateProps,
  formData: FormData
): Promise<PlantStateProps> {
  const rawData = Object.fromEntries(formData)
  const result = plantSchema.safeParse(rawData)

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors

    return {
      message: false,
      errors: fieldErrors,
    }
  }

  try {
    await editPlantDb(id, result.data)
    revalidatePath('/')
    return {
      message: true,
      errors: {},
    }
  } catch (error) {
    if (error instanceof Error && error.message.toLowerCase().includes('slug already exists')) {
      return {
        message: false,
        errors: {
          name: ['A plant with this name already exists.'],
        },
      }
    }

    throw error
  }
}

export async function deleteBlog(id: string) {
  await deletePlantDB(id)
  revalidatePath('/')
}
