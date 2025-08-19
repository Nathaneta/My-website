import { useState } from 'react'

const filters = ['All', 'Finance', 'Healthcare', 'Retail', 'Manufacturing']

export default function CaseStudies() {
  const [active, setActive] = useState('All')
  const items = Array.from({ length: 9 }).map((_, i) => ({ id: i, industry: filters[(i % (filters.length-1)) + 1], title: `Project ${i+1}` }))
  const filtered = active === 'All' ? items : items.filter((x) => x.industry === active)

  return (
    <div className="px-6 py-10 lg:px-10">
      <h2 className="text-3xl font-bold">Case Studies</h2>
      <div className="mt-6 flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)} className={`px-3 py-1.5 rounded-md border ${active===f?'bg-brand border-brand':'bg-white/5 border-white/10'}`}>{f}</button>
        ))}
      </div>
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <article key={p.id} className="rounded-xl bg-white/5 p-4 border border-white/10">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-neutral-300 text-sm">{p.industry}</p>
            <div className="h-32 mt-3 rounded-lg bg-gradient-to-tr from-brand/20 to-cyan-400/20" />
          </article>
        ))}
      </div>
    </div>
  )
}

