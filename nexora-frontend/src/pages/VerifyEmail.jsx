import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../utils/api'

export default function VerifyEmail() {
  const location = useLocation()
  const navigate = useNavigate()
  const [email] = useState(location.state?.email || '')
  const [code, setCode] = useState('')
  const [counter, setCounter] = useState(60)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const id = setInterval(() => setCounter((c) => (c > 0 ? c - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const verify = async () => {
    try {
      await api.post('/verify', { email, code })
      setMessage('Verified! Redirecting to login…')
      setTimeout(() => navigate('/login'), 1000)
    } catch (e) {
      setMessage('Invalid or expired code.')
    }
  }

  const resend = async () => {
    try {
      await api.post('/register/resend', { email })
      setCounter(60)
      setMessage('Code resent.')
    } catch (e) {
      setMessage('Failed to resend code.')
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-2 text-2xl font-semibold">Verify your email</h1>
      <p className="mb-4 text-sm text-gray-600">We sent a 6-digit code to {email || 'your email'}.</p>
      <input value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} className="w-full rounded-md border px-3 py-2 tracking-widest" placeholder="123456" />
      <div className="mt-3 flex items-center gap-3">
        <button onClick={verify} className="rounded-md bg-brand px-4 py-2 text-white">Verify</button>
        <button onClick={resend} disabled={counter > 0} className="rounded-md border px-4 py-2">
          {counter > 0 ? `Resend in ${counter}s` : 'Resend code'}
        </button>
      </div>
      {message && <div className="mt-3 text-sm">{message}</div>}
    </div>
  )
}

