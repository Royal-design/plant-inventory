'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { registerSchema, RegisterType } from '@/schemas/authSchema'
import { getUserByEmail } from '@/data/user'

export async function register(values: RegisterType) {
  const validatedFields = registerSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }

  const { email, name, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return {
      error: 'User email already exists.',
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    return {
      success: 'Account created successfully! Please sign in.',
    }
  } catch (error) {
    return {
      error: 'Something went wrong. Please try again.',
    }
  }
}
