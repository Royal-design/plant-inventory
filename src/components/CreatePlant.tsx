'use client'

import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useAppDispatch } from '@/redux/hook'
import { closeModal } from '@/redux/slice/modalSlice'

import { useForm } from 'react-hook-form'
import { plantSchema, PlantType } from '@/schemas/plantSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { createPlant } from '@/actions/plant'
import { Button } from './ui/button'
import { toast } from 'sonner'

export const CreatePlant = () => {
  const dispatch = useAppDispatch()

  const form = useForm({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      name: '',
      type: '',
      price: 0,
      category: '',
      description: '',
    },
  })
  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: PlantType) => {
    const data = await createPlant(values)

    if (data.success) {
      toast.success('Successfully created!')
      dispatch(closeModal())
      form.reset()
    }

    if (data.error?.toLowerCase().includes('name')) {
      form.setError('name', { message: 'Slug already exist' })
    } else if (data.error) {
      toast.error(data.error)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Type" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={field.value?.toString() ?? ''}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value)
                        field.onChange(isNaN(value) ? undefined : value)
                      }}
                      placeholder="Enter Price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Category" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-12 resize-none"
                    placeholder="Write plant description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting}>{isSubmitting ? 'Creating' : 'Create'}</Button>
        </form>
      </Form>
    </div>
  )
}
