import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import prisma from '@/lib/prisma'

export default async function Home() {
  const plants = await prisma.plant.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Plants</h1>
      <DataTable columns={columns} data={plants} />
    </div>
  )
}
