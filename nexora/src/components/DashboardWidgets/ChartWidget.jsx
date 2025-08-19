import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ChartWidget({ data }) {
  return (
    <div className="rounded-xl bg-white/5 p-4 border border-white/10 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis dataKey="name" stroke="#a3a3a3" />
          <YAxis stroke="#a3a3a3" />
          <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
          <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

