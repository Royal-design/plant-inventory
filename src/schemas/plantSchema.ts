import z from 'zod'

export const plantSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  price: z.coerce.number().positive({ message: 'Price must be a number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  description: z.string().min(5, { message: 'Description is required' }),
})
