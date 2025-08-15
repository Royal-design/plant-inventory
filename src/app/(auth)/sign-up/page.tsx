import { Suspense } from 'react'
import { SignUpForm } from '@/components/SignUpForm'
import React from 'react'

export default function RegisterPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  )
}
