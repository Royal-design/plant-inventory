'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { closeModal } from '@/redux/slice/modalSlice'

type ModalProps = {
  title: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

export const DialogModal = ({ title, children, footer }: ModalProps) => {
  const dispatch = useAppDispatch()
  const { isOpen, size = 'md', data } = useAppSelector((state) => state.modal)
  console.log(data, isOpen)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && dispatch(closeModal())}>
      <DialogContent className={`max-w-md w-${size} max-md:w-sm`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="py-4">{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
