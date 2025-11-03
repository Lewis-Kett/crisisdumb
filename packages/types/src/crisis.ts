import { z } from 'zod'

export const CrisisStatus = z.enum(['ACTIVE', 'MONITORING', 'RESOLVED'])

export type CrisisStatus = z.infer<typeof CrisisStatus>

export const CrisisSeverity = z.enum(['P0', 'P1', 'P2', 'P3'])
export type CrisisSeverity = z.infer<typeof CrisisSeverity>

export const Crisis = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string(),
  severity: CrisisSeverity,
  status: CrisisStatus,
  createdAt: z.date(),
  updatedAt: z.date(),
  resolvedAt: z.date().nullable(),
  aiSummary: z.string().nullable(),
})

export type Crisis = z.infer<typeof Crisis>

  export const CreateCrisisInput = Crisis.pick({
    title: true,
    description: true,
    severity: true, 
  }).extend({
    status: CrisisStatus.optional().default('ACTIVE'),
  })

export type CreateCrisisInput = z.infer<typeof CreateCrisisInput>

export const UpdateCrisisStatusInput = z.object({
  id: z.string().uuid(),
  status: CrisisStatus,
})

export type UpdateCrisisStatusInput = z.infer<typeof UpdateCrisisStatusInput>
