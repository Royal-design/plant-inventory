import { HomeIcon, Sprout } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'

export const Navbar = () => {
  return (
    <div className="bg-background/95 sticky top-0 w-full border-b backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-7">
        <nav className="hidden justify-between p-4 md:flex">
          <Link href="/" className="tracking-wider">
            🌱 Plant Inventory
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="flex items-center gap-2">
              <Link href="/plants" className="">
                <Sprout className="h-6 w-6" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/" className="">
                <HomeIcon className="h-6 w-6" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </div>
  )
}
