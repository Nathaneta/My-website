import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../utils/api'

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! How can I help you today?' }])
  const [input, setInput] = useState('')

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    try {
      const { data } = await api.post('/ai/chat', { messages: [...messages, userMsg] })
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || '...'}])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, something went wrong.' }])
    }
  }

  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className="bg-brand hover:bg-brand-dark text-white rounded-full px-4 py-2 shadow-lg">
        Chat
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="mt-2 w-[320px] rounded-xl bg-neutral-900 border border-white/10 p-3">
            <div className="h-64 overflow-y-auto space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                  <span className={`inline-block px-3 py-2 rounded-lg ${m.role==='user'?'bg-brand text-white':'bg-white/5'}`}>{m.content}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input value={input} onChange={(e)=>setInput(e.target.value)} className="flex-1 rounded-md bg-white/5 border border-white/10 px-3 py-2" placeholder="Ask anything..." />
              <button onClick={send} className="bg-brand hover:bg-brand-dark rounded-md px-3">Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

