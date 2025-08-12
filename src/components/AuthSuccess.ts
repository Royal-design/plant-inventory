'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

export const AuthSuccess = () => {
  const { status } = useSession()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (status === 'authenticated') {
      toast.success('Logged in successfully!')
    } else if (error) {
      toast.error('Failed to log in')
    }
  }, [status, error])

  return null
}
