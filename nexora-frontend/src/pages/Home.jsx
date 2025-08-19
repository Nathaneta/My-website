import ThreeDHero from '../components/3DHero'
import AIChatbot from '../components/AIChatbot'
import ServiceSelector from '../components/ServiceSelector'

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">AI-Powered Solutions for Modern Enterprises</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">Personalized recommendations, interactive demos, and immersive experiences to accelerate your business.</p>
        </div>
        <div className="mt-8">
          <ThreeDHero />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xl font-semibold">Find Your Ideal Solution</h2>
        <ServiceSelector />
      </section>

      <AIChatbot />
    </div>
  )
}

