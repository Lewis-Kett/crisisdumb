import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import dotenv from 'dotenv'
import { appRouter } from './router'
import { createContext } from './context'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' })
})

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

app.listen(port, () => {
  console.log(`🚀 API server running on http://localhost:${port}`)
  console.log(`📡 tRPC endpoint: http://localhost:${port}/trpc`)
})
