import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function SpinningCube() {
  return (
    <mesh rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  )
}

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">AI-driven Solutions for Modern Enterprises</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">Personalized insights, immersive 3D, and secure collaboration. Built with Nexora.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <h2 className="mb-2 text-xl font-semibold">AI Recommendations</h2>
            <p className="text-gray-600 dark:text-gray-300">Tailored content and actions based on your role and goals.</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <h2 className="mb-2 text-xl font-semibold">Interactive 3D</h2>
            <p className="text-gray-600 dark:text-gray-300">Explore services through immersive, interactive scenes.</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 py-12 dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <Canvas camera={{ position: [3, 3, 3] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <Suspense>
                <SpinningCube />
              </Suspense>
              <OrbitControls enablePan={false} />
            </Canvas>
          </div>
        </div>
      </section>
    </div>
  )
}

