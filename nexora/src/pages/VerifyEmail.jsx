import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { useState, useEffect } from 'react'

export default function VerifyEmail() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email
  const [seconds, setSeconds] = useState(120)

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const formik = useFormik({
    initialValues: { code: '' },
    validationSchema: Yup.object({ code: Yup.string().length(6, '6 digits').required('Required') }),
    onSubmit: async (values) => {
      await api.post('/verify', { email, code: values.code })
      navigate('/login')
    },
  })

  const resend = async () => {
    await api.post('/register', { email })
    setSeconds(120)
  }

  return (
    <div className="px-6 py-10 lg:px-10 max-w-md mx-auto">
      <h2 className="text-3xl font-bold">Verify Email</h2>
      <p className="text-neutral-300 mt-2">We sent a 6-digit code to {email || 'your email'}.</p>
      <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm mb-1">Verification Code</label>
          <input className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 tracking-widest text-center" maxLength={6} {...formik.getFieldProps('code')} />
          {formik.touched.code && formik.errors.code && <p className="text-red-400 text-sm mt-1">{formik.errors.code}</p>}
        </div>
        <button type="submit" className="w-full bg-brand hover:bg-brand-dark rounded-md px-3 py-2 font-medium">Verify</button>
        <button type="button" disabled={seconds>0} onClick={resend} className="w-full rounded-md px-3 py-2 border border-white/10 disabled:opacity-50">
          {seconds>0 ? `Resend code in ${seconds}s` : 'Resend code'}
        </button>
      </form>
    </div>
  )
}

