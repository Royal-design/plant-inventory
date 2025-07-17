'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormMessage, FormControl } from '@/components/ui/form'
import { signInSchema, SignInType } from '@/schemas/authSchema'
import { Socials } from './Socials'
import { logIn } from '@/actions/signIn'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function SignInForm() {
  const router = useRouter()
  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting
  const onSubmit = async (values: SignInType) => {
    console.log('Submitted:', values)
    const result = await logIn(values)

    if (result.success) {
      form.reset()
      toast.success('Logged in successfully!')
      router.push('/')
    }
    if (result?.error) {
      toast.error(result.error)
    }
  }

  return (
    <div className="flex w-full flex-col items-center py-4 max-md:p-6">
      <Card className="w-full md:w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with GitHub or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Socials />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input {...field} id="email" type="email" placeholder="m@example.com" />
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
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <Input {...field} id="password" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? 'Logging-in' : 'Login'}
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
