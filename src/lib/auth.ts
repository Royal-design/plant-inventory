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
  session: { strategy: 'jwt' },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log('Authorize called with:', { email: credentials?.email })

        try {
          const validatedFields = signInSchema.safeParse(credentials)

          if (!validatedFields.success) {
            console.error('Validation failed:', validatedFields.error)
            return null
          }

          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email)
          console.log('User found:', !!user, user?.email)

          if (!user || !user.password) {
            console.log('No user found or no password set')
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)
          console.log('Password match:', passwordsMatch)

          if (!passwordsMatch) {
            console.log('Password does not match')
            return null
          }

          // Return user object without password
          const { ...userWithoutPassword } = user
          console.log('Returning user:', userWithoutPassword)
          return userWithoutPassword
        } catch (error) {
          console.error('Error in authorize:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = typeof token.id === 'string' ? token.id : String(token.id)
      }
      return session
    },
  },
  events: {
    async signIn(message) {
      console.log('SignIn event:', message)
    },
    async signOut(message) {
      console.log('SignOut event:', message)
    },
  },
  // debug: process.env.NODE_ENV === 'development',
})
