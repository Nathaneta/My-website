import { Suspense } from 'react'
import AIChatbot from '../components/AIChatbot'
import Hero3D from '../components/3DHero'

export default function Home() {
  return (
    <div className="px-6 py-10 lg:px-10">
      <section className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight">Nexora</h1>
          <p className="mt-4 text-neutral-300 max-w-prose">
            AI-driven solutions, immersive 3D experiences, and enterprise-grade UX.
          </p>
        </div>
        <div className="h-[320px] lg:h-[420px] rounded-xl overflow-hidden ring-1 ring-white/10">
          <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading 3D...</div>}>
            <Hero3D />
          </Suspense>
        </div>
      </section>

      <section className="mt-12 grid lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-white/5">Personalized recommendations</div>
        <div className="p-6 rounded-xl bg-white/5">Interactive dashboards</div>
        <div className="p-6 rounded-xl bg-white/5">Secure authentication</div>
      </section>

      <div className="fixed bottom-6 right-6">
        <AIChatbot />
      </div>
    </div>
  )
}

