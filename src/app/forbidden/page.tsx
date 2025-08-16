import React from 'react'

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
        Forbidden: You do not have access to this page.
      </h1>
    </div>
  )
}
