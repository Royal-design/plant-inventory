'use client'

import { HomeIcon, Menu, Sprout, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo / Title */}
          <Link href="/" className="text-lg font-semibold tracking-wider">
            🌱 Plant Inventory
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild className="flex items-center gap-2">
              <Link href="/plants">
                <Sprout className="h-5 w-5" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="flex items-center gap-2">
              <Link href="/">
                <HomeIcon className="h-5 w-5" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="mt-2 space-y-2 pb-4 md:hidden">
            <Link
              href="/plants"
              className="hover:bg-muted flex items-center gap-2 rounded px-4 py-2 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sprout className="h-5 w-5" />
              <span>Plants</span>
            </Link>
            <Link
              href="/"
              className="hover:bg-muted flex items-center gap-2 rounded px-4 py-2 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
