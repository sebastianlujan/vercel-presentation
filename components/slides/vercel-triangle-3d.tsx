"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Floating particles - minimal SF fog effect
function Particles({ count = 80 }) {
  const mesh = useRef<THREE.Points>(null)
  const initialPositions = useRef<Float32Array | null>(null)
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
    }
    return pos
  }, [count])
  
  useEffect(() => {
    initialPositions.current = new Float32Array(positions)
  }, [positions])
  
  useFrame(({ clock }) => {
    if (mesh.current && initialPositions.current) {
      const pos = mesh.current.geometry.attributes.position.array as Float32Array
      const time = clock.getElapsedTime()
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        // Gentle drift
        pos[i3 + 1] = initialPositions.current[i3 + 1] + Math.sin(time * 0.15 + i * 0.5) * 0.3
        pos[i3] = initialPositions.current[i3] + Math.cos(time * 0.1 + i * 0.3) * 0.2
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
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// Clean white Vercel triangle
function Triangle() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const size = 2
    const height = size * Math.sqrt(3) / 2
    
    // Vercel triangle pointing up
    shape.moveTo(0, height * 0.55)
    shape.lineTo(size / 2, -height * 0.45)
    shape.lineTo(-size / 2, -height * 0.45)
    shape.closePath()
    
    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    }
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime()
      // Subtle floating
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.08
      // Very gentle rotation
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.06
    }
  })
  
  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.15}
        metalness={0}
      />
    </mesh>
  )
}

export function VercelTriangle3D() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="w-[340px] h-[340px] flex items-center justify-center">
        <svg 
          width="100" 
          height="87" 
          viewBox="0 0 76 65" 
          fill="none" 
          className="opacity-30"
        >
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white"/>
        </svg>
      </div>
    )
  }
  
  return (
    <div className="w-[340px] h-[340px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        {/* Clean lighting - no harsh shadows */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 5]} intensity={0.6} color="#ffffff" />
        <directionalLight position={[-2, -2, 3]} intensity={0.2} color="#ffffff" />
        
        {/* Black fog fading into distance */}
        <fog attach="fog" args={["#000000", 4, 12]} />
        
        {/* Scene */}
        <Particles count={80} />
        <Triangle />
      </Canvas>
    </div>
  )
}
