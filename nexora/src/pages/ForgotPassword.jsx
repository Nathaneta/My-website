import { useFormik } from 'formik'
import * as Yup from 'yup'
import { api } from '../utils/api'
import { useState } from 'react'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)
  const formik = useFormik({
    initialValues: { email: '', code: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid').required('Required'),
      code: Yup.string().when('email', (email, schema) => (sent ? schema.length(6, '6 digits').required('Required') : schema)),
      password: Yup.string().when('code', (code, schema) => (sent ? schema.min(8).required('Required') : schema)),
    }),
    onSubmit: async (values) => {
      if (!sent) {
        await api.post('/reset-password', { email: values.email })
        setSent(true)
      } else {
        await api.post('/reset-password', { email: values.email, code: values.code, password: values.password })
        setSent(false)
      }
    },
  })

  return (
    <div className="px-6 py-10 lg:px-10 max-w-md mx-auto">
      <h2 className="text-3xl font-bold">Forgot Password</h2>
      <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>}
        </div>
        {sent && (
          <>
            <div>
              <label className="block text-sm mb-1">Code</label>
              <input className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 tracking-widest" maxLength={6} {...formik.getFieldProps('code')} />
            </div>
            <div>
              <label className="block text-sm mb-1">New Password</label>
              <input type="password" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('password')} />
            </div>
          </>
        )}
        <button type="submit" className="w-full bg-brand hover:bg-brand-dark rounded-md px-3 py-2 font-medium">
          {sent ? 'Reset Password' : 'Send Reset Code'}
        </button>
      </form>
    </div>
  )
}

