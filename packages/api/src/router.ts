import { router } from './trpc'
import { crisesRouter } from './routers/crisis'

export const appRouter = router({
  crisis: crisesRouter,
})

export type AppRouter = typeof appRouter

