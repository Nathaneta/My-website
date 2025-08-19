import { useState } from 'react'
import { api } from '../utils/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [phase, setPhase] = useState(1)
  const [msg, setMsg] = useState('')

  const request = async () => {
    try {
      await api.post('/reset-password/request', { email })
      setPhase(2)
      setMsg('Code sent. Check your email.')
    } catch (e) {
      setMsg('Failed to send code.')
    }
  }

  const reset = async () => {
    try {
      await api.post('/reset-password', { email, code, password })
      setMsg('Password updated. You can now login.')
    } catch (e) {
      setMsg('Reset failed.')
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Forgot Password</h1>
      {phase === 1 && (
        <div className="space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2" />
          <button onClick={request} className="w-full rounded-md bg-brand py-2 text-white">Send reset code</button>
        </div>
      )}
      {phase === 2 && (
        <div className="space-y-3">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="6-digit code" className="w-full rounded-md border px-3 py-2" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" type="password" className="w-full rounded-md border px-3 py-2" />
          <button onClick={reset} className="w-full rounded-md bg-brand py-2 text-white">Update password</button>
        </div>
      )}
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  )
}

