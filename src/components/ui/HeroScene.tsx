'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Outer icosahedron — large, cyan, slow rotation + mouse parallax
function Icosahedron() {
  const ref = useRef<THREE.Mesh>(null)
  const rx = useRef(0)
  const ry = useRef(0)
  const { mouse } = useThree()

  useFrame((_, delta) => {
    if (!ref.current) return
    rx.current += delta * 0.07
    ry.current += delta * 0.13
    ref.current.rotation.x = rx.current + mouse.y * 0.38
    ref.current.rotation.y = ry.current + mouse.x * 0.38
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.22} />
    </mesh>
  )
}

// Inner octahedron — smaller, indigo, counter-rotation
function InnerCore() {
  const ref = useRef<THREE.Mesh>(null)
  const rx = useRef(Math.PI * 0.25)
  const rz = useRef(0)
  const { mouse } = useThree()

  useFrame((_, delta) => {
    if (!ref.current) return
    rx.current -= delta * 0.05
    rz.current += delta * 0.09
    ref.current.rotation.x = rx.current + mouse.y * 0.14
    ref.current.rotation.z = rz.current + mouse.x * 0.14
  })

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.1, 0]} />
      <meshBasicMaterial color="#818CF8" wireframe transparent opacity={0.18} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ fov: 40, position: [0, 0, 7] }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <Icosahedron />
      <InnerCore />
    </Canvas>
  )
}
