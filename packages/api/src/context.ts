import { inferAsyncReturnType } from '@trpc/server'
import { createDbClient } from '@crisisdumb/db'

export const createContext = () => {
  const db = createDbClient(process.env.DATABASE_URL!)

    const tenantId = '00000000-0000-0000-0000-000000000001'

  return {
    db,
    tenantId,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
