import { useState } from 'react'

export default function Contact() {
  const [message, setMessage] = useState('')
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Contact & Engagement</h1>
      <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-300">AI-powered contact form and interactive client map coming soon.</p>
      <div className="mt-6 max-w-xl">
        <label className="block text-sm font-medium">Your Message</label>
        <textarea value={message} onChange={(e)=>setMessage(e.target.value)} className="mt-2 w-full rounded-md border border-gray-300 p-3 dark:border-gray-700" rows={4} />
        <button className="mt-3 rounded-md bg-primary-600 px-4 py-2 text-white">Send</button>
      </div>
    </div>
  )
}

