import { useState } from 'react'
import { api } from '../utils/api'

export default function ServiceSelector() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ industry: '', goal: '', budget: '' })
  const [suggestion, setSuggestion] = useState(null)
  const [loading, setLoading] = useState(false)

  const next = () => setStep((s) => Math.min(3, s + 1))
  const prev = () => setStep((s) => Math.max(1, s - 1))

  const submit = async () => {
    setLoading(true)
    try {
      const { data } = await api.post('/services/recommend', form)
      setSuggestion(data)
    } catch (e) {
      setSuggestion({ name: 'AI Advisory', description: 'A starter package for strategy and quick wins.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200/10 p-6">
      <div className="mb-4 flex items-center gap-2 text-sm">
        <span className={`h-6 w-6 rounded-full text-center leading-6 ${step >= 1 ? 'bg-brand text-white' : 'bg-gray-200'}`}>1</span>
        <span className={`h-6 w-6 rounded-full text-center leading-6 ${step >= 2 ? 'bg-brand text-white' : 'bg-gray-200'}`}>2</span>
        <span className={`h-6 w-6 rounded-full text-center leading-6 ${step >= 3 ? 'bg-brand text-white' : 'bg-gray-200'}`}>3</span>
      </div>
      {step === 1 && (
        <div className="space-y-3">
          <label className="block text-sm">Industry</label>
          <input className="w-full rounded-md border px-3 py-2" placeholder="e.g., Finance" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
          <button className="rounded-md bg-brand px-4 py-2 text-white" onClick={next}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-3">
          <label className="block text-sm">Primary Goal</label>
          <input className="w-full rounded-md border px-3 py-2" placeholder="e.g., Reduce churn" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} />
          <div className="flex gap-2">
            <button className="rounded-md border px-4 py-2" onClick={prev}>Back</button>
            <button className="rounded-md bg-brand px-4 py-2 text-white" onClick={next}>Next</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-3">
          <label className="block text-sm">Monthly Budget</label>
          <input className="w-full rounded-md border px-3 py-2" placeholder="$5,000" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
          <div className="flex gap-2">
            <button className="rounded-md border px-4 py-2" onClick={prev}>Back</button>
            <button className="rounded-md bg-brand px-4 py-2 text-white" onClick={submit} disabled={loading}>{loading ? 'Calculating…' : 'Get Recommendation'}</button>
          </div>
        </div>
      )}
      {suggestion && (
        <div className="mt-6 rounded-lg border p-4">
          <div className="text-sm uppercase text-gray-500">Suggested Solution</div>
          <div className="mt-1 text-lg font-medium">{suggestion.name}</div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{suggestion.description}</p>
        </div>
      )}
    </div>
  )
}

