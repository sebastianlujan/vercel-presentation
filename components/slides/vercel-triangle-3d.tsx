"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

// Floating particles in the fog
function Particles({ count = 50 }) {
  const mesh = useRef<THREE.Points>(null)
  
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2
      sizes[i] = Math.random() * 2 + 0.5
    }
    
    return [positions, sizes]
  }, [count])
  
  useFrame((state) => {
    if (mesh.current) {
      const positions = mesh.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        // Slow upward drift
        positions[i * 3 + 1] += 0.002
        // Reset particles that drift too high
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = -4
        }
        // Subtle horizontal sway
        positions[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001
      }
      mesh.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// Solid white Vercel triangle
function Triangle() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const size = 1.8
    const height = size * Math.sqrt(3) / 2
    
    shape.moveTo(0, height * 0.6)
    shape.lineTo(size / 2, -height * 0.4)
    shape.lineTo(-size / 2, -height * 0.4)
    shape.closePath()
    
    const extrudeSettings = {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2,
    }
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.08
    }
  })
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.1}
      floatIntensity={0.3}
      floatingRange={[-0.05, 0.05]}
    >
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.1}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </Float>
  )
}

export function VercelTriangle3D() {
  return (
    <div className="w-[320px] h-[320px] relative">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Minimal lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 5, 5]} intensity={0.8} />
        
        {/* Fog */}
        <fog attach="fog" args={["#000000", 3, 10]} />
        
        {/* Scene */}
        <Particles count={60} />
        <Triangle />
      </Canvas>
    </div>
  )
}
