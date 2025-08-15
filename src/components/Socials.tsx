'use client'

import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Loading fallback for the Socials component
function SocialsLoading() {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <Button variant="outline" type="button" className="w-full" disabled>
        <FaGithub />
        Loading...
      </Button>
      <Button variant="outline" type="button" className="w-full" disabled>
        <FaGoogle />
        Loading...
      </Button>
      <div className="relative text-center text-sm">
        <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
        <div className="border-border absolute inset-0 top-1/2 border-t" />
      </div>
    </div>
  )
}

// Component that uses useSearchParams
function SocialsContent() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const onClick = (provider: 'google' | 'github') => {
    setIsLoading(provider)

    // Set the pending auth flag BEFORE signing in
    sessionStorage.setItem('pendingAuth', 'true')

    signIn(provider, { callbackUrl }).catch(() => {
      toast.error('Failed to log in')
      setIsLoading(null)
      // Remove the flag if sign-in fails
      sessionStorage.removeItem('pendingAuth')
    })
  }

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={() => onClick('github')}
        disabled={isLoading !== null}
      >
        <FaGithub />
        {isLoading === 'github' ? 'Signing in...' : 'Login with GitHub'}
      </Button>
      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={() => onClick('google')}
        disabled={isLoading !== null}
      >
        <FaGoogle />
        {isLoading === 'google' ? 'Signing in...' : 'Login with Google'}
      </Button>
      <div className="relative text-center text-sm">
        <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
        <div className="border-border absolute inset-0 top-1/2 border-t" />
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export const Socials = () => {
  return (
    <Suspense fallback={<SocialsLoading />}>
      <SocialsContent />
    </Suspense>
  )
}
