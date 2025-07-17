import z from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const signInSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type SignInType = z.infer<typeof signInSchema>
export type RegisterType = z.infer<typeof registerSchema>
