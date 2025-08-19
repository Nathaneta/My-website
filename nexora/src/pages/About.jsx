import ChartWidget from '../components/DashboardWidgets/ChartWidget'

export default function About() {
  const data = Array.from({ length: 12 }).map((_, i) => ({ name: `Q${i + 1}`, value: Math.round(50 + Math.random() * 50) }))
  return (
    <div className="px-6 py-10 lg:px-10">
      <h2 className="text-3xl font-bold">About Us</h2>
      <p className="mt-4 text-neutral-300 max-w-prose">
        Interactive impact charts, executive bios, and milestones timeline.
      </p>
      <div className="mt-6">
        <ChartWidget data={data} />
      </div>
    </div>
  )
}

