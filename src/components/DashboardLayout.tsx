'use client'
import { MenuItem, Role } from '@/types/customType'
import React, { useState } from 'react'
import { Home, Users, Settings, LayoutDashboard, User, ChevronDown, Menu, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const sideBar: Record<Role, MenuItem[]> = {
  ADMIN: [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard />,
      path: '/admin/dashboard',
    },
    {
      name: 'Users',
      icon: <Users />,
      path: '/admin/users',
      submenu: [
        { name: 'All Users', icon: <User />, path: '/admin/users' },
        { name: 'Add User', icon: <User />, path: '/admin/users/new' },
      ],
    },
    {
      name: 'Settings',
      icon: <Settings />,
      path: '/admin/settings',
    },
  ],
  USER: [
    {
      name: 'Home',
      icon: <Home />,
      path: '/dashboard',
      submenu: [
        { name: 'All Users', icon: <User />, path: '/dashboard' },
        { name: 'Add User', icon: <User />, path: '/admin/users/new' },
      ],
    },
    {
      name: 'Profile',
      icon: <User />,
      path: '/dashboard/profile',
    },
    {
      name: 'Settings',
      icon: <Settings />,
      path: '/dashboard/settings',
    },
  ],
}

interface SidebarItemProps {
  item: MenuItem
  isActive: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({ isActive, item }) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const pathname = usePathname()
  const hasSubMenu = !!item.submenu

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubMenu) {
      e.preventDefault()
      setExpanded(!expanded)
    }
  }

  return (
    <div className="">
      <Link
        href={item.path || '#'}
        className={cn(
          'inline-flex w-full items-center gap-2 rounded-md p-2 transition-colors',
          isActive
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
        )}
        onClick={handleClick}
      >
        {item.icon}
        <span>{item.name}</span>
        {hasSubMenu && (
          <ChevronDown
            className={cn(
              'ml-auto h-4 w-4 transition-transform duration-200',
              expanded ? 'rotate-180' : 'rotate-0'
            )}
          />
        )}
      </Link>
      {hasSubMenu && expanded && (
        <div className="relative mt-1 ml-4">
          <div className="flex flex-col space-y-1 pl-4">
            {item.submenu?.map((subItem, index) => {
              const isSubItemActive = pathname === subItem.path
              return (
                <div key={index} className="relative">
                  <Link
                    href={subItem.path || '#'}
                    className={cn(
                      'inline-flex w-full items-center gap-2 rounded-md p-2 text-sm transition-colors',
                      isSubItemActive
                        ? 'border-l-2 border-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/30'
                    )}
                  >
                    <span className="flex h-4 w-4 items-center justify-center">{subItem.icon}</span>
                    <span>{subItem.name}</span>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  userRole: Role
  isCollapsed?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, isCollapsed = false }) => {
  const pathname = usePathname()
  const menuItems = sideBar[userRole] || []

  if (isCollapsed) {
    return (
      <div className="sticky top-0 h-screen w-16 border-r border-gray-200 bg-white transition-all dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-4 p-4">
          {menuItems.map((item, index) => (
            <Link
              key={`${item.name}-${index}`}
              href={item.path!}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                pathname === item.path
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
              }`}
              title={item.name}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-0 h-screen w-64 overflow-y-auto border-r border-gray-200 bg-white transition-all dark:border-gray-700 dark:bg-gray-800">
      <div className="p-6">
        <h2 className="mb-8 text-xl font-semibold text-gray-800 dark:text-gray-100">
          {userRole === 'ADMIN' ? 'Admin Panel' : 'Dashboard'}
        </h2>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={`${item.name}-${index}`}
              item={item}
              isActive={pathname === item.path}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Show loading state while session is loading
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-blue-400"></div>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    )
  }

  // Get user role from session - middleware ensures user is authenticated
  const userRole: Role = (session?.user as any)?.role || 'USER'

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userRole={userRole} isCollapsed={sidebarCollapsed} />

      <div className="flex flex-1 flex-col">
        <header className="border-b border-gray-200 bg-white px-6 py-4 transition-colors dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {session?.user?.name || 'User'}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
