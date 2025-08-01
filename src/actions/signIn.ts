'use server'

import { signIn } from '@/lib/auth'
import { signInSchema, SignInType } from '@/schemas/authSchema'
import { AuthError } from 'next-auth'

export async function logIn(values: SignInType, callbackUrl?: string | null) {
  const validatedFields = signInSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: callbackUrl || '/',
    })

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    return { error: 'Unexpected error occurred!' }
  }
}
