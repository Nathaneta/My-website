import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/dashboard')
        setData(data.kpis || [])
      } catch (e) {
        setData([
          { name: 'Mon', uv: 400 },
          { name: 'Tue', uv: 300 },
          { name: 'Wed', uv: 500 },
          { name: 'Thu', uv: 200 },
          { name: 'Fri', uv: 700 },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-4">
            <div className="mb-2 text-sm text-gray-500">Weekly UV</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line type="monotone" dataKey="uv" stroke="#6C5CE7" strokeWidth={2} />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="mb-2 text-sm text-gray-500">AI Recommendations</div>
            <ul className="list-disc space-y-2 pl-5 text-sm">
              <li>Automate weekly reporting to save ~6 hours/week.</li>
              <li>Re-allocate 10% budget from low-ROI channels.</li>
              <li>Enable anomaly alerts for churn spikes.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

