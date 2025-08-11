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
      redirectTo: callbackUrl || '/', // Use redirectTo instead of redirect: false
    })

    // This line will not be reached if redirect is successful
    return { success: true }
  } catch (error) {
    console.error('Login error:', error)

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        case 'CallbackRouteError':
          return { error: 'Authentication callback failed!' }
        default:
          return { error: `Authentication error: ${error.type}` }
      }
    }

    // Re-throw redirect errors (successful case)
    throw error
  }
}
