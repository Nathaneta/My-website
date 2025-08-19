import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Contact() {
  const formik = useFormik({
    initialValues: { name: '', email: '', message: '', industry: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid').required('Required'),
      message: Yup.string().min(10, 'Too short').required('Required'),
    }),
    onSubmit: (values) => {
      // Placeholder; integrate with backend
      alert('Submitted!')
    },
  })

  const suggestions = formik.values.industry ? `Resources for ${formik.values.industry}` : 'Suggested resources will appear here'

  return (
    <div className="px-6 py-10 lg:px-10 grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-3xl font-bold">Contact & Engagement</h2>
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          <input placeholder="Name" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('name')} />
          <input placeholder="Email" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('email')} />
          <input placeholder="Industry" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('industry')} />
          <textarea placeholder="Message" rows={5} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" {...formik.getFieldProps('message')} />
          <button type="submit" className="bg-brand hover:bg-brand-dark rounded-md px-3 py-2 font-medium">Send</button>
        </form>
      </div>
      <div>
        <div className="rounded-xl bg-white/5 p-4 border border-white/10">
          <h3 className="font-semibold">AI Suggestions</h3>
          <p className="text-neutral-300 mt-2 text-sm">{suggestions}</p>
        </div>
        <div className="mt-6 h-64 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300">
          Map placeholder (integrate Google Maps)
        </div>
      </div>
    </div>
  )
}

