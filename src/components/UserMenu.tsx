'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import { toast } from 'sonner'

export function UserMenu() {
  const router = useRouter()
  const { data: session } = useSession()

  const user = session?.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.image ?? ''} alt={user?.name ?? 'User'} />
            <AvatarFallback>{user?.name?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{user?.name ?? 'My Account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            try {
              await signOut()
              toast.success('Logged out successfully!')
            } catch (error) {
              toast.error('Failed to log out')
            }
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
