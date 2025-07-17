import z from 'zod'

export const plantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(5, 'Description must be at least 5 characters'),
})

export type PlantType = z.infer<typeof plantSchema>
