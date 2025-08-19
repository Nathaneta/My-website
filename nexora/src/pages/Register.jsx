import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'

function strength(password) {
  let score = 0
  if (!password) return 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return Math.min(score, 5)
}

export default function Register() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { email: '', password: '', confirmPassword: '', company: '', industry: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid').required('Required'),
      password: Yup.string().min(8, 'Min 8 chars').required('Required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
    }),
    onSubmit: async (values) => {
      await api.post('/register', {
        email: values.email,
        password: values.password,
        company: values.company || undefined,
        industry: values.industry || undefined,
      })
      navigate('/verify', { state: { email: values.email } })
    },
  })

  const score = strength(formik.values.password)

  return (
    <div className="px-6 py-10 lg:px-10 max-w-md mx-auto">
      <h2 className="text-3xl font-bold">Register</h2>
      <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('password')} />
          <div className="h-2 bg-white/10 rounded mt-2 overflow-hidden">
            <div className={`h-full transition-all ${['w-0','w-1/5','w-2/5','w-3/5','w-4/5','w-full'][score]} ${score < 3 ? 'bg-red-500' : score < 5 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Confirm Password</label>
          <input type="password" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('confirmPassword')} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{formik.errors.confirmPassword}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Company (optional)</label>
            <input className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('company')} />
          </div>
          <div>
            <label className="block text-sm mb-1">Industry (optional)</label>
            <input className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('industry')} />
          </div>
        </div>
        <button type="submit" className="w-full bg-brand hover:bg-brand-dark rounded-md px-3 py-2 font-medium">Create account</button>
        <p className="text-sm text-neutral-300">Already have an account? <Link to="/login" className="text-brand">Login</Link></p>
      </form>
    </div>
  )
}

