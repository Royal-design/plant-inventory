'use client'

import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export const Socials = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl })
      .then(() => toast.success('Logged in successfully!'))
      .catch(() => toast.error('Failed to log in'))
  }

  return (
    <div className="mb-4 flex flex-col gap-4">
      <Button variant="outline" type="button" className="w-full" onClick={() => onClick('github')}>
        <FaGithub />
        Login with GitHub
      </Button>
      <Button variant="outline" type="button" className="w-full" onClick={() => onClick('google')}>
        <FaGoogle />
        Login with Google
      </Button>
      <div className="relative text-center text-sm">
        <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
        <div className="border-border absolute inset-0 top-1/2 border-t" />
      </div>
    </div>
  )
}
