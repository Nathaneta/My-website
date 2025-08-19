import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { api } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import zxcvbn from 'zxcvbn'

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Min 8 chars').required('Required'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  company: Yup.string(),
  industry: Yup.string(),
})

export default function Register() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Create your account</h1>
      <Formik
        initialValues={{ email: '', password: '', confirm: '', company: '', industry: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            await api.post('/register', {
              email: values.email,
              password: values.password,
              company: values.company || undefined,
              industry: values.industry || undefined,
            })
            navigate('/verify', { state: { email: values.email } })
          } catch (e) {
            setStatus('Registration failed')
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ values, isSubmitting, status }) => {
          const strength = zxcvbn(values.password || '').score
          return (
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
                <div className="mt-2 h-2 w-full rounded bg-gray-200">
                  <div className={`h-2 rounded ${['w-1/5 bg-red-500','w-2/5 bg-orange-500','w-3/5 bg-yellow-500','w-4/5 bg-lime-500','w-full bg-green-600'][strength]}`}></div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm">Confirm Password</label>
                <Field name="confirm" type="password" className="w-full rounded-md border px-3 py-2" />
                <div className="mt-1 text-xs text-red-500"><ErrorMessage name="confirm" /></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm">Company (optional)</label>
                  <Field name="company" type="text" className="w-full rounded-md border px-3 py-2" />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Industry (optional)</label>
                  <Field name="industry" type="text" className="w-full rounded-md border px-3 py-2" />
                </div>
              </div>
              {status && <div className="text-sm text-red-500">{status}</div>}
              <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-brand py-2 text-white">
                {isSubmitting ? 'Creating…' : 'Create account'}
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

