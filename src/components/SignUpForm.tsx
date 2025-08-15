'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { registerSchema, RegisterType } from '@/schemas/authSchema'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from './ui/form'
import { register } from '@/actions/register'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

// Extract the component content
function SignUpFormContent() {
  const router = useRouter()

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: RegisterType) => {
    try {
      const result = await register(values)

      // Check if the result is undefined or null (successful redirect case)
      if (!result) {
        toast.success('Account created successfully!')
        form.reset()
        router.push('/sign-in')
        return
      }

      // Handle explicit success response
      if (result.success) {
        toast.success(result.success)
        form.reset()
        router.push('/sign-in')
        return
      }

      // Handle error response
      if (result?.error) {
        toast.error(result.error)
        return
      }

      // Handle unexpected response
      toast.error('Unexpected response from server.')
    } catch (error) {
      console.error('Registration error:', error)

      // Check if it's a Next.js redirect (successful case)
      if (
        error &&
        typeof error === 'object' &&
        'digest' in error &&
        typeof (error as { digest?: unknown }).digest === 'string' &&
        (error as { digest: string }).digest.includes('NEXT_REDIRECT')
      ) {
        toast.success('Account created successfully!')
        return
      }

      // Handle other unexpected errors
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="flex w-full flex-col items-center p-6 md:py-4">
      <Card className="w-full md:w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign up to get started</CardTitle>
          <CardDescription>Create your account to access all features</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="First name first..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="m@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="••••••••" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

// Main component with Suspense boundary
export function SignUpForm() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full flex-col items-center p-6 md:py-4">
          <Card className="w-full md:w-md">
            <CardContent className="flex items-center justify-center p-6">
              <div>Loading...</div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <SignUpFormContent />
    </Suspense>
  )
}
