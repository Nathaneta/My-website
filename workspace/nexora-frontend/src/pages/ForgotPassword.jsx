import { useState } from 'react'
import api from '../utils/api'

export default function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function sendCode(e) {
    e.preventDefault()
    setError('')
    try {
      await api.post('/reset-password', { email, send: true })
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not send code')
    }
  }

  async function resetPassword(e) {
    e.preventDefault()
    setError('')
    try {
      await api.post('/reset-password', { email, code, password })
      setStep(3)
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed')
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold">Reset password</h1>
      {step === 1 && (
        <form onSubmit={sendCode} className="mt-6 space-y-4">
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">{error}</div>}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700" />
          </div>
          <button className="w-full rounded-md bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700">Send code</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={resetPassword} className="mt-6 space-y-4">
          {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">{error}</div>}
          <div>
            <label className="block text-sm font-medium">Code</label>
            <input value={code} onChange={(e)=>setCode(e.target.value)} required className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700" />
          </div>
          <button className="w-full rounded-md bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700">Reset password</button>
        </form>
      )}
      {step === 3 && (
        <div className="mt-6 rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-200">Password reset successful. You can now sign in.</div>
      )}
    </div>
  )
}

