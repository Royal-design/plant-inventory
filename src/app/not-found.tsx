import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-foreground mb-4 text-6xl font-bold">404</h1>
          <h2 className="text-foreground mb-2 text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-md px-6 py-3 transition-colors"
          >
            Go Home
          </Link>

          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
