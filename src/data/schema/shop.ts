import { z } from 'zod'

export const shopCategorySchema = z.enum(['food', 'stage', 'facility', 'experience'])

export const shopSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  location: z.tuple([z.number(), z.number()]),
  image: z.string(),
  category: shopCategorySchema,
  isNepp: z.boolean(),
})

export const shopListSchema = z.array(shopSchema)

export type Shop = z.infer<typeof shopSchema>
export type ShopCategory = z.infer<typeof shopCategorySchema>
