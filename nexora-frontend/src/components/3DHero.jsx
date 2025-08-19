import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function SpinningGlobe() {
  return (
    <mesh rotation={[0.3, 0.6, 0]}>
      <sphereGeometry args={[1.4, 32, 32]} />
      <meshStandardMaterial color={new THREE.Color('#6C5CE7')} metalness={0.2} roughness={0.4} />
    </mesh>
  )
}

export default function ThreeDHero() {
  return (
    <div className="mx-auto h-72 w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200/10">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <SpinningGlobe />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  )
}

