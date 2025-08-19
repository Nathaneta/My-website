import { useState } from 'react'
import { api } from '../utils/api'

export default function AIChatbot() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! How can I help you explore Nexora today?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    try {
      const { data } = await api.post('/chat', { messages: [...messages, userMsg] })
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || '...' }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-80 rounded-xl border border-gray-200/10 bg-white shadow-xl dark:bg-gray-900">
      <div className="border-b p-3 text-sm font-medium">AI Assistant</div>
      <div className="max-h-72 space-y-2 overflow-y-auto p-3 text-sm">
        {messages.map((m, idx) => (
          <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={`inline-block rounded-lg px-3 py-2 ${m.role === 'user' ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <div className="text-xs text-gray-500">Thinking…</div>}
      </div>
      <div className="flex items-center gap-2 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about services, demos, pricing…"
          className="flex-1 rounded-md border bg-transparent px-3 py-2 text-sm outline-none"
        />
        <button onClick={sendMessage} className="rounded-md bg-brand px-3 py-2 text-sm text-white">Send</button>
      </div>
    </div>
  )
}

