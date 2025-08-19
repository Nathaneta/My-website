import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import zxcvbn from 'zxcvbn'

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  remember: Yup.boolean(),
})

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Login</h1>
      <Formik
        initialValues={{ email: '', password: '', remember: true }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          const res = await login(values.email, values.password)
          if (res.ok) navigate('/dashboard')
          else setStatus('Login failed. Please verify your email or check credentials.')
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm">Email</label>
              <Field name="email" type="email" className="w-full rounded-md border px-3 py-2" />
              <div className="mt-1 text-xs text-red-500"><ErrorMessage name="email" /></div>
            </div>
            <div>
              <label className="mb-1 block text-sm">Password</label>
              <Field name="password" type="password" className="w-full rounded-md border px-3 py-2" />
              <div className="mt-1 text-xs text-red-500"><ErrorMessage name="password" /></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2"><Field type="checkbox" name="remember" /> Remember me</label>
              <Link to="/forgot-password" className="text-brand">Forgot password?</Link>
            </div>
            {status && <div className="text-sm text-red-500">{status}</div>}
            <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-brand py-2 text-white">
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
            <p className="text-sm">No account? <Link className="text-brand" to="/register">Register</Link></p>
          </Form>
        )}
      </Formik>
    </div>
  )
}

