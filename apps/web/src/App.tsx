import { trpc } from './lib/trpc'

function App() {
  const { data, isLoading, error } = trpc.crisis.list.useQuery()

  if (isLoading) return <div>Loading crises...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>CrisisDumb - Crisis Management</h1>
      <h2>Crises ({data?.length || 0})</h2>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App

