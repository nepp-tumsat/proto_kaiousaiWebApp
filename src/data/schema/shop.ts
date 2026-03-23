import { z } from 'zod'

export const shopCategorySchema = z.enum(['food', 'stage', 'facility', 'experience'])

/** `image` は `public/images/` からの相対パス。模擬店写真は `shops/` 配下に置く。 */
export const shopSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  location: z.tuple([z.number(), z.number()]),
  image: z.string().refine((s) => s.startsWith('shops/'), {
    message: 'image must be a path under public/images/shops/ (e.g. shops/yakisoba.jpg)',
  }),
  category: shopCategorySchema,
  isNepp: z.boolean(),
})

export const shopListSchema = z.array(shopSchema)

export type Shop = z.infer<typeof shopSchema>
export type ShopCategory = z.infer<typeof shopCategorySchema>
