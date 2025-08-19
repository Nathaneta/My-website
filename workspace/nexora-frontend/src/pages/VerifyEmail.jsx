import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function VerifyEmail() {
  const [code, setCode] = useState(['','','','','',''])
  const [error, setError] = useState('')
  const [seconds, setSeconds] = useState(120)
  const inputRefs = useRef([])
  const navigate = useNavigate()
  const { state } = useLocation()
  const email = state?.email

  useEffect(() => {
    const t = setInterval(() => setSeconds((s)=> Math.max(0, s-1)), 1000)
    return () => clearInterval(t)
  }, [])

  function handleChange(idx, value) {
    if (!/^\d?$/.test(value)) return
    const next = [...code]
    next[idx] = value
    setCode(next)
    if (value && idx < 5) inputRefs.current[idx+1]?.focus()
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const token = code.join('')
      await api.post('/verify', { email, code: token })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired code')
    }
  }

  async function resend() {
    try {
      await api.post('/register', { email, resend: true })
      setSeconds(120)
    } catch (_) {}
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold">Verify your email</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">We sent a 6-digit code to {email || 'your email'}. Enter it below.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">{error}</div>}
        <div className="flex items-center justify-between gap-2">
          {code.map((v, i)=> (
            <input
              key={i}
              ref={(el)=> inputRefs.current[i] = el}
              value={v}
              onChange={(e)=>handleChange(i, e.target.value)}
              className="h-12 w-12 rounded-md border border-gray-300 text-center text-xl dark:border-gray-700"
              inputMode="numeric"
              maxLength={1}
            />
          ))}
        </div>
        <button className="w-full rounded-md bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700">Verify</button>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {seconds > 0 ? (
            <span>Code expires in {Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}</span>
          ) : (
            <button type="button" onClick={resend} className="text-primary-600">Resend code</button>
          )}
        </div>
      </form>
    </div>
  )
}

