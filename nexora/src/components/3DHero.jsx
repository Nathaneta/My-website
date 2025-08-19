import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

function RotatingIcosahedron() {
  return (
    <mesh rotation={[0.4, 0.6, 0]}>
      <icosahedronGeometry args={[2, 0]} />
      <meshStandardMaterial color={'#4f46e5'} wireframe />
    </mesh>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <RotatingIcosahedron />
      </Suspense>
      <OrbitControls enablePan={false} />
    </Canvas>
  )
}

