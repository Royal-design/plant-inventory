'use client'

import { useActionState, useEffect } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { PlantStateProps, createPlant } from '@/actions/plant'
import { useAppDispatch } from '@/redux/hook'
import { closeModal } from '@/redux/slice/modalSlice'
import { FormButton } from './FormButton'

const initialState: PlantStateProps = {
  message: false,
  errors: {},
}

export const CreatePlant = () => {
  const dispatch = useAppDispatch()
  const [state, formAction] = useActionState(createPlant, initialState)

  useEffect(() => {
    if (state.message) {
      dispatch(closeModal())
    }
  }, [state.message, dispatch])

  return (
    <div>
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          <Label>Name</Label>
          <Input type="text" name="name" placeholder="Enter Name" />
          {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Label>Type</Label>
          <Input type="text" name="type" placeholder="Enter Type" />
          {state.errors?.type && <p className="text-sm text-red-500">{state.errors.type}</p>}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="grid w-full grid-cols-1 gap-2">
            <Label>Price</Label>
            <Input type="number" name="price" step="0.01" min="0" placeholder="Enter Price" />
            {state.errors?.price && <p className="text-sm text-red-500">{state.errors.price}</p>}
          </div>
          <div className="grid w-full grid-cols-1 gap-2">
            <Label>Category</Label>
            <Input type="text" name="category" placeholder="Enter Category" />
            {state.errors?.category && (
              <p className="text-sm text-red-500">{state.errors.category}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Label>Description</Label>
          <Textarea
            name="description"
            className="min-h-12 resize-none"
            placeholder="Write plant description..."
          />
          {state.errors?.description && (
            <p className="text-sm text-red-500">{state.errors.description}</p>
          )}
        </div>
        <FormButton text="Create" loadingText="Creating" />
      </form>
    </div>
  )
}
