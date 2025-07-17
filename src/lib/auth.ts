import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma'
import { signInSchema } from '@/schemas/authSchema'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/data/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials)

        if (!validatedFields.success) {
          throw new Error('Invalid input. Please check your email and password.')
        }

        const { email, password } = validatedFields.data
        const user = await getUserByEmail(email)

        if (!user || !user.password) {
          throw new Error('No user found with this email.')
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) {
          throw new Error('Incorrect password.')
        }

        return user
      },
    }),
  ],
  
})
