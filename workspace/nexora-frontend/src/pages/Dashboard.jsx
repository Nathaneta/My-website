import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

export default function Dashboard() {
  const { user } = useAuth()
  const [kpis, setKpis] = useState(null)

  useEffect(() => {
    let mounted = true
    api.get('/dashboard').then(({ data }) => {
      if (mounted) setKpis(data)
    }).catch(() => {
      if (mounted) setKpis({ chart: [
        { name: 'Mon', value: 12 }, { name: 'Tue', value: 18 }, { name: 'Wed', value: 9 }, { name: 'Thu', value: 22 }, { name: 'Fri', value: 17 }
      ] })
    })
    return () => { mounted = false }
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-baseline justify-between">
        <h1 className="text-3xl font-bold">Welcome, {user?.email || 'User'}</h1>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">Role: {user?.role || 'Client'}</span>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
          <h2 className="mb-3 text-lg font-semibold">Weekly Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpis?.chart || []}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
          <h2 className="mb-3 text-lg font-semibold">AI Recommendations</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
            <li>Optimize task assignment based on workload</li>
            <li>Schedule weekly sync for Project Alpha</li>
            <li>Review anomaly detected in KPI stream</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

