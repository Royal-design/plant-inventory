'use client'

import { useAppSelector } from '@/redux/hook'
import { DialogModal } from './DialogModal'
import { CreatePlant } from './CreatePlant'
import { EditPlant } from './EditPlant'

export const ShowModal = () => {
  const { type, data } = useAppSelector((state) => state.modal)

  if (type === 'edit plant' && data) {
    return (
      <DialogModal title="Edit Plant">
        <EditPlant data={data} />
      </DialogModal>
    )
  }

  if (type === 'create plant') {
    return (
      <DialogModal title="Create Plant">
        <CreatePlant />
      </DialogModal>
    )
  }

  return null
}
