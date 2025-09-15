"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

function Knot() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25
      ref.current.rotation.x += delta * 0.1
    }
  })
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <torusKnotGeometry args={[1.1, 0.35, 220, 32]} />
      <meshPhysicalMaterial
        color="#0ea5e9" // cyan-500 (primary)
        roughness={0.1}
        metalness={0.6}
        clearcoat={1}
        clearcoatRoughness={0.05}
        transmission={0.5}
        thickness={1.0}
      />
    </mesh>
  )
}

export default function R3fHero() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows dpr={[1, 2]} className="bg-transparent">
      <color attach="background" args={["#000000"]} />
      <Suspense fallback={null}>
        <group position={[0, 0, 0]}>
          <Knot />
          <Environment preset="studio" />
        </group>
      </Suspense>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 2]} intensity={1.2} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  )
}
