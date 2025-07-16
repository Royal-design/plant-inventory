'use client'

import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'

export const FormButton = ({ text, loadingText }: { text: string; loadingText: string }) => {
  const { pending } = useFormStatus()
  return <Button disabled={pending}>{pending ? loadingText : text}</Button>
}
