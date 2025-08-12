import { AuthSuccess } from '@/components/AuthSuccess'
import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (!session) redirect('/sign-in')
  const plants = await prisma.plant.findMany({
    orderBy: { createdAt: 'desc' },
  })
  console.log(session)

  return (
    <div className="space-y-4 p-6">
      <AuthSuccess />
      <h1 className="text-2xl font-bold">Plants</h1>
      <p>{session.user?.email}</p>
      <DataTable columns={columns} data={plants} />
    </div>
  )
}
