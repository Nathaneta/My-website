export default function KPICard({ label, value, trend }) {
  return (
    <div className="rounded-xl bg-white/5 p-4 border border-white/10">
      <p className="text-sm text-neutral-300">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className={`text-sm mt-2 ${trend>=0?'text-green-400':'text-red-400'}`}>{trend>=0?'+':''}{trend}%</p>
    </div>
  )
}

