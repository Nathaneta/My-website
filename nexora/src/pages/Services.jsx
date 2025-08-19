import ServiceSelector from '../components/ServiceSelector'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function Services() {
  return (
    <div className="px-6 py-10 lg:px-10 space-y-6">
      <h2 className="text-3xl font-bold">Services & Solutions</h2>
      <div className="mt-6">
        <ServiceSelector />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white/5 p-4 border border-white/10">
          <h3 className="font-semibold mb-3">Interactive Prototype</h3>
          <div className="h-64 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5,5,5]} />
              <mesh rotation={[0.5, 0.2, 0.1]}>
                <boxGeometry args={[1.2, 1.2, 1.2]} />
                <meshStandardMaterial color={'#22d3ee'} wireframe />
              </mesh>
              <OrbitControls enablePan={false} />
            </Canvas>
          </div>
        </div>
        <div className="rounded-xl bg-white/5 p-4 border border-white/10">
          <h3 className="font-semibold mb-3">Live SaaS API Example</h3>
          <p className="text-neutral-300">Connect to a backend endpoint to demonstrate real-time integration.</p>
        </div>
      </div>
    </div>
  )
}

