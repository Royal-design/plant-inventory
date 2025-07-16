'use client'

import { useAppSelector } from '@/redux/hook'
import { DialogModal } from './DialogModal'
import { CreatePlant } from './CreatePlant'
import { EditPlant } from './EditPlant'

export const ShowModal = () => {
  const { type, data } = useAppSelector((state) => state.modal)

  return (
    <div>
      {type === 'create plant' ? (
        <DialogModal title="Create Plant" children={<CreatePlant />} />
      ) : type === 'edit plant' ? (
        <DialogModal title="Edit Plant" children={<EditPlant data={data} />} />
      ) : null}
    </div>
  )
}
