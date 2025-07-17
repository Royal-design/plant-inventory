import prisma from '@/lib/prisma'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  } catch (error) {
    throw new Error('Failed to find user by email')
  }
}
