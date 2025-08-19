import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const { login, authError } = useAuth()

  const formik = useFormik({
    initialValues: { email: '', password: '', remember: false },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(8, 'Min 8 chars').required('Required'),
    }),
    onSubmit: async (values) => {
      const ok = await login(values.email, values.password, values.remember)
      if (ok) navigate('/dashboard')
    },
  })

  return (
    <div className="px-6 py-10 lg:px-10 max-w-md mx-auto">
      <h2 className="text-3xl font-bold">Login</h2>
      <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" {...formik.getFieldProps('remember')} />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-brand">Forgot password?</Link>
        </div>
        {authError && <p className="text-red-400 text-sm">{authError}</p>}
        <button type="submit" className="w-full bg-brand hover:bg-brand-dark rounded-md px-3 py-2 font-medium">Login</button>
        <p className="text-sm text-neutral-300">No account? <Link to="/register" className="text-brand">Register</Link></p>
      </form>
    </div>
  )
}

