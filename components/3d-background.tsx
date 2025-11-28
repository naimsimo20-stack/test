"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Icosahedron } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function RotatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Smooth animation at stable FPS
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.25
    }
  })

  // Memoize geometry/material (perf boost)
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#9d4edd",
        wireframe: true,
        emissive: "#6d28d9",
        emissiveIntensity: 0.35,
      }),
    []
  )

  return (
    <Icosahedron ref={meshRef} args={[1, 4]}>
      <primitive object={material} attach="material" />
    </Icosahedron>
  )
}

export default function Background3D() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, zIndex: -1 }}
      camera={{ position: [0, 0, 2.2], fov: 45 }}
      dpr={[1, 1.8]} // lower GPU consumption on mobile
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />

      <RotatingGeometry />

      {/* OrbitControls removed for performance & UX
          (background shouldn’t be interactable) */}
    </Canvas>
  )
}
