import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [remember, setRemember] = useState(true)
  const navigate = useNavigate()
  const { login } = useAuth()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/login', { email, password, remember })
      login({ jwt: data.token, profile: data.user })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">{error}</div>}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="mt-1 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700" />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} /> Remember me
          </label>
          <Link to="/forgot-password" className="text-sm text-primary-600">Forgot password?</Link>
        </div>
        <button className="w-full rounded-md bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700">Sign in</button>
      </form>
      <p className="mt-4 text-sm">No account? <Link to="/register" className="text-primary-600">Create one</Link></p>
    </div>
  )
}

