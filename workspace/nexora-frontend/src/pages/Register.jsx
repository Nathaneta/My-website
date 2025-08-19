import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

function PasswordStrength({ value }) {
  const score = Math.min(4, [/.{8,}/.test(value), /[A-Z]/.test(value), /[a-z]/.test(value), /\d/.test(value), /[^A-Za-z0-9]/.test(value)].filter(Boolean).length)
  const colors = ['bg-red-500','bg-yellow-500','bg-blue-500','bg-green-500']
  return (
    <div className="mt-2 h-2 w-full rounded bg-gray-200 dark:bg-gray-800">
      <div className={`h-2 rounded ${colors[Math.max(0, score-1)]}`} style={{ width: `${(score/4)*100}%` }} />
    </div>
  )
}

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '', company: '', industry: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    try {
      await api.post('/register', { email: form.email, password: form.password, company: form.company, industry: form.industry })
      navigate('/verify', { state: { email: form.email } })
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">{error}</div>}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} required className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700" />
          <PasswordStrength value={form.password} />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input type="password" value={form.confirm} onChange={(e)=>setForm({...form, confirm: e.target.value})} required className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Company (optional)</label>
            <input value={form.company} onChange={(e)=>setForm({...form, company: e.target.value})} className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium">Industry (optional)</label>
            <input value={form.industry} onChange={(e)=>setForm({...form, industry: e.target.value})} className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700" />
          </div>
        </div>
        <button className="w-full rounded-md bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700">Register</button>
      </form>
    </div>
  )
}

