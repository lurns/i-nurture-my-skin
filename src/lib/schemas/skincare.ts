// src/lib/schemas/skincare.ts
import { statusOptions } from '$lib/utils/constants'
import { z } from 'zod'

export const skincareEntrySchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  name: z.string().min(1, 'Product name is required'),
  type: z.string().min(1, 'Type is required'),
  status: z.enum(statusOptions, {
    message: 'Please select a valid status'
  }),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
  rating: z.number().min(1.0).max(5.0).nullable(),
  notes: z.string().nullable()
})

export type SkincareEntryInput = z.infer<typeof skincareEntrySchema>