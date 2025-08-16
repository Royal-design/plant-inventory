'use client'

import { HomeIcon, Menu, Sprout, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'
import { UserMenu } from './UserMenu'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Role } from '@/types/customType'
import { BiSolidDashboard } from 'react-icons/bi'

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const role = session?.user.role as Role
  const pathName = usePathname()
  if (pathName === '/dashboard' || pathName.startsWith('/admin')) return null

  return (
    <div className="sticky top-0 z-50 w-full border-b border-green-200/50 bg-white/95 backdrop-blur-2xl dark:border-green-800/30 dark:bg-gray-900/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 w-full items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-wider text-green-700 transition-colors hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            🌱 Plant Inventory
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              asChild
              className="flex items-center gap-2 text-gray-700 hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
            >
              <Link href="/">
                <HomeIcon className="h-5 w-5" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="flex items-center gap-2 text-gray-700 hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
            >
              <Link href="/plant">
                <Sprout className="h-5 w-5" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              asChild
              className="flex items-center gap-2 text-gray-700 hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
            >
              <Link href={role === 'USER' ? '/dashboard' : '/admin'}>
                <BiSolidDashboard />
                <span>Dashboard</span>
              </Link>
            </Button>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <ModeToggle />
            <UserMenu />
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <UserMenu />
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="text-gray-700 hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="mt-2 space-y-2 border-t border-green-200/30 pt-4 pb-4 md:hidden dark:border-green-800/30">
            <Link
              href="/"
              className="flex items-center gap-2 rounded px-4 py-2 text-gray-700 transition hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/plant"
              className="flex items-center gap-2 rounded px-4 py-2 text-gray-700 transition hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sprout className="h-5 w-5" />
              <span>Plants</span>
            </Link>

            <Link
              href={role === 'USER' ? '/dashboard' : '/admin'}
              className="flex items-center gap-2 rounded px-4 py-2 text-gray-700 transition hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
            >
              <BiSolidDashboard />
              <span>Dashboard</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
