import { router, publicProcedure } from '../trpc'
import { crises } from '@crisisdumb/db'
import { and, eq } from 'drizzle-orm'
import { CreateCrisisInput, UpdateCrisisStatusInput } from '@crisisdumb/types'
import { emitEvent } from '../events'

export const crisesRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(crises).where(eq(crises.tenantId, ctx.tenantId))
  }),

  create: publicProcedure
    .input(CreateCrisisInput)
    .mutation(async ({ ctx, input }) => {
      const [crisis] = await ctx.db
        .insert(crises)
        .values({
          ...input,
          tenantId: ctx.tenantId,
        })
        .returning()

      emitEvent('crises.created', {
        crisesId: crisis.id,
        tenantId: crisis.tenantId,
        severity: crisis.severity,
      })

      return crisis
    }),

  updateStatus: publicProcedure
    .input(UpdateCrisisStatusInput)
    .mutation(async ({ ctx, input }) => {
      const [crisis] = await ctx.db
        .update(crises)
        .set({
          status: input.status,
          updatedAt: new Date(),
          resolvedAt: input.status === 'RESOLVED' ? new Date() : null,
        })
        .where(and(eq(crises.id, input.id), eq(crises.tenantId, ctx.tenantId)))
        .returning()

      emitEvent('crisis.status.updated', {
        crisisId: crisis.id,
        tenantId: crisis.tenantId,
        status: crisis.status,
      })

      return crisis
    }),
})
