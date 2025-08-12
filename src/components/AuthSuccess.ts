'use client'
import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export const AuthSuccess = () => {
  const { status } = useSession()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const hasShownToast = useRef(false)

  useEffect(() => {
    // Only show success toast if there's a pending auth flag
    if (status === 'authenticated' && !hasShownToast.current) {
      const isNewLogin = sessionStorage.getItem('pendingAuth')
      if (isNewLogin) {
        toast.success('Logged in successfully!')
        sessionStorage.removeItem('pendingAuth')
        hasShownToast.current = true
      }
    }

    // Show error toast
    if (error && !hasShownToast.current) {
      toast.error('Failed to log in')
      hasShownToast.current = true
    }
  }, [status, error])

  return null
}
