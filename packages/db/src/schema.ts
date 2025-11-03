import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const crisisStatusEnum = pgEnum('crisis_status', [
  'ACTIVE',
  'MONITORING',
  'RESOLVED',
])

  export const crisisSeverityEnum = pgEnum('crisis_severity', [
    'P0',
    'P1',
    'P2',
    'P3',
  ])

export const crises = pgTable('crises', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  severity: crisisSeverityEnum('severity').notNull(),
  status: crisisStatusEnum('status').notNull().default('ACTIVE'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  resolvedAt: timestamp('resolved_at'),
  aiSummary: text('ai_summary'),
})

export const crisisEvents = pgTable('crisis_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(),
  tenantId: uuid('tenant_id').notNull(),
  crisisId: uuid('crisis_id').notNull().references(() => crises.id),
  payload: text('payload').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow()
})
