# CrisisDumb - Project Overview

## Purpose
A multi-tenant crisis management and RCA (Root Cause Analysis) system for tracking, managing, and analyzing incidents. Built as a learning project to master a modern tech stack before starting a new role.

## Timeline
**5 days** to build a working MVP that demonstrates proficiency with all key technologies.

## Core Tech Stack (Matching New Company)

### Monorepo & Build
- **PNPM**: Package manager with workspace support
- **Turborepo**: Build orchestration and caching

### Frontend
- **React + Vite**: SPA framework and build tool
- **Zustand**: Client-side state management
- **React Query (TanStack Query)**: Server state management
- **Zod**: Runtime type validation

### API Layer
- **tRPC**: End-to-end typesafe APIs (migration target from GraphQL)
- **Express**: Node.js server

### Database
- **PostgreSQL**: Primary database
- **Drizzle ORM**: TypeScript-first ORM

### Event System
- **EventBridge pattern**: Event-driven architecture using EventEmitter locally
- **Event Sourcing**: Store all events for audit trail

### Infrastructure
- **Docker Compose**: Local development
- **SST (Serverless Stack)**: AWS deployment with Lambda
- **AWS Services**: Lambda, EventBridge, DynamoDB for production

## MVP Features (Simplified Scope)

### Must Have
1. **Create Crisis**: Title, description, severity (P0-P3)
2. **List Crises**: Filtered by tenant
3. **Update Status**: detected → investigating → resolved
4. **Real-time Updates**: WebSocket subscriptions for live changes
5. **Async Processing**: Mock AI summary generation after resolution
6. **Multi-tenant Isolation**: Each tenant only sees their data

### Not Included (To Save Time)
- Authentication (use mock tenant ID)
- Complex authorization (all users can do everything)
- RCA workflows
- Metrics/analytics
- External integrations
- Pagination
- Search
- Comments

## Project Structure

```
crisisdumb/
├── apps/
│   ├── web/              # React frontend
│   └── api/              # tRPC backend
├── packages/
│   ├── types/            # Shared Zod schemas
│   └── db/               # Drizzle ORM schemas
├── docker-compose.yml    # Local dev environment
├── sst.config.ts         # AWS deployment config
├── turbo.json            # Build pipeline
├── pnpm-workspace.yaml   # Workspace config
└── package.json          # Root scripts
```

## Data Models

### Crisis
- id: string
- tenantId: string
- title: string
- description: string
- severity: P0 | P1 | P2 | P3
- status: detected | investigating | resolved
- createdAt: Date
- resolvedAt: Date?
- aiSummary: string?

### CrisisEvent (for event sourcing)
- id: string
- type: crisis.created | crisis.updated | crisis.resolved
- tenantId: string
- crisisId: string
- payload: JSON
- timestamp: Date

### TenantContext
- tenantId: string
- userId: string
- role: string

## Implementation Plan

### Day 1: Foundation ✅
- [x] PNPM workspace setup
- [x] Turborepo configuration
- [x] Types package with Zod schemas
- [x] DB package with Drizzle schemas
- [x] Basic monorepo scripts

### Day 2: Backend API
- [ ] PostgreSQL with Docker
- [ ] tRPC router setup
- [ ] CRUD procedures (create, list, updateStatus)
- [ ] Event emission on mutations
- [ ] Tenant isolation in queries
- [ ] WebSocket subscription support

### Day 3: Frontend
- [ ] Vite + React setup
- [ ] tRPC client configuration
- [ ] Crisis form component
- [ ] Crisis list with filters
- [ ] Zustand store for state
- [ ] Real-time subscription handling

### Day 4: Event System & Async
- [ ] Event bus implementation
- [ ] Crisis event handlers
- [ ] Mock AI summary worker
- [ ] Async request tracking
- [ ] UI updates from events

### Day 5: Deployment
- [ ] Docker Compose for full stack
- [ ] SST configuration
- [ ] Lambda handlers
- [ ] Environment variables
- [ ] Deploy to AWS

## Key Learning Goals

1. **Monorepo Management**: Understand workspace dependencies and build orchestration
2. **Type Safety**: End-to-end types from database to frontend
3. **Event-Driven Architecture**: Async processing and real-time updates
4. **Multi-tenancy**: Data isolation patterns
5. **Modern Frontend State**: Server vs client state separation
6. **Serverless Deployment**: AWS Lambda and related services

## API Endpoints (tRPC Procedures)

```typescript
// Core procedures to implement
crisis.create        // Create new crisis
crisis.list          // List with tenant filter
crisis.updateStatus  // Change crisis status
crisis.subscribe     // WebSocket updates
```

## Event Flow

```
User Action → tRPC Mutation → Database → Event Emission → 
  ├── WebSocket Broadcast (real-time UI updates)
  └── Async Worker (AI summary generation)
```

## Development Commands

```bash
# Root level
pnpm install         # Install all dependencies
pnpm dev            # Start all services
pnpm build          # Build all packages
pnpm clean          # Clean all artifacts

# Database
pnpm --filter @crisisdumb/db generate  # Generate migrations
pnpm --filter @crisisdumb/db migrate   # Run migrations

# Local environment
docker-compose up   # Start PostgreSQL
```

## Environment Variables

```env
# apps/api/.env
DATABASE_URL=postgresql://user:password@localhost:5432/crisisdumb
JWT_SECRET=mock-secret

# apps/web/.env
VITE_API_URL=http://localhost:3000
```

## Success Criteria

By end of Day 5:
- [ ] Can create a crisis in one browser tab
- [ ] See it appear in real-time in another tab
- [ ] Can update crisis status
- [ ] Mock AI summary appears after resolution
- [ ] Different tenants see different data
- [ ] Deployed to AWS with SST

## Common Issues & Solutions

1. **Module resolution**: Check package names match imports
2. **Type errors**: Ensure all packages have tsconfig.json
3. **WebSocket connection**: Verify client/server URLs
4. **Tenant isolation**: Always filter by tenantId in queries
5. **Event handling**: Use EventEmitter for local dev, EventBridge for production

## Next Steps After MVP

Once working, could add:
- Real AI integration with Bedrock
- RCA workflow with templates
- Metrics dashboard
- Slack/PagerDuty integration
- Proper authentication with Auth0

## Resources

- [tRPC Docs](https://trpc.io/docs)
- [Drizzle Docs](https://orm.drizzle.team)
- [SST Guide](https://docs.sst.dev)
- [Turborepo Handbook](https://turbo.build/repo/docs)

## Current Status
**Day 1 Complete**: Monorepo and types are set up, ready to build the API on Day 2.
