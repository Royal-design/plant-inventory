'use client'

import { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plant } from '@/generated/prisma'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/hook'
import { setModal } from '@/redux/slice/modalSlice'
import { deleteBlog } from '@/actions/plant'
import { toast } from 'sonner'

function ActionsCell({ row }: { row: Row<Plant> }) {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const plant = row.original

  const handleDelete = async () => {
    const res = await deleteBlog(plant.id)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success(`${plant.name} deleted successfully`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            dispatch(
              setModal({
                isOpen: true,
                data: plant,
                type: 'edit plant',
              })
            )
          }
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/plant/${plant.slug}`)}>
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<Plant>[] = [
  {
    accessorKey: 'createdAt',
    id: 'sn',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        S/N
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'))
      return <span>${amount.toFixed(2)}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]
