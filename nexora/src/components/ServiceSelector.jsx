import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  { key: 'industry', label: 'Select your industry', options: ['Finance', 'Healthcare', 'Retail', 'Manufacturing'] },
  { key: 'goal', label: 'What is your main goal?', options: ['Reduce Costs', 'Increase Revenue', 'Improve CX', 'Automate Tasks'] },
  { key: 'tech', label: 'Preferred technology focus', options: ['Computer Vision', 'NLP', 'Forecasting', 'RPA'] },
]

export default function ServiceSelector() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const current = steps[step]

  const select = (opt) => {
    const next = { ...answers, [current.key]: opt }
    setAnswers(next)
    if (step < steps.length - 1) setStep(step + 1)
  }

  const reset = () => { setStep(0); setAnswers({}) }

  return (
    <div className="rounded-xl bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">AI-Powered Solution Selector</h3>
        <button onClick={reset} className="text-sm text-neutral-300 hover:text-white">Reset</button>
      </div>
      <div className="mt-4">
        {step < steps.length ? (
          <motion.div key={current.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-neutral-300 mb-3">{current.label}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {current.options.map((o) => (
                <button key={o} onClick={() => select(o)} className="rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-white/10 px-4 py-3 text-left">
                  {o}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-neutral-300">Recommended Solution:</p>
            <div className="mt-3 p-4 rounded-lg bg-brand/10 border border-brand/30">
              <p className="font-medium">AI Pipeline for {answers.industry} to {answers.goal} using {answers.tech}</p>
              <p className="text-sm text-neutral-300 mt-1">Includes a quick prototype and ROI projection.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

