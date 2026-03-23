import { z } from 'zod'

export const festivalEventSchema = z.object({
  id: z.number(),
  time: z.string(),
  title: z.string(),
  location: z.string(),
  description: z.string(),
  isNow: z.boolean(),
})

export const festivalEventListSchema = z.array(festivalEventSchema)

export type FestivalEvent = z.infer<typeof festivalEventSchema>
