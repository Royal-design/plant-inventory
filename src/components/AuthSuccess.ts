'use client'
import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export const AuthSuccess = () => {
  const { status } = useSession()
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
  }, [status])

  useEffect(() => {
    // Handle URL-based error reporting
    if (typeof window !== 'undefined' && !hasShownToast.current) {
      const urlParams = new URLSearchParams(window.location.search)
      const error = urlParams.get('error')

      if (error) {
        toast.error('Failed to log in')
        hasShownToast.current = true

        // Optional: Clean up the URL by removing the error parameter
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('error')
        window.history.replaceState({}, '', newUrl.toString())
      }
    }
  }, [])

  return null
}
