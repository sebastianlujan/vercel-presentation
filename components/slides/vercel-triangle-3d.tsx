"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei"
import * as THREE from "three"

function Triangle() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Create triangle geometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const size = 1.5
    const height = size * Math.sqrt(3) / 2
    
    // Vercel triangle pointing up
    shape.moveTo(0, height * 0.6)
    shape.lineTo(size / 2, -height * 0.4)
    shape.lineTo(-size / 2, -height * 0.4)
    shape.closePath()
    
    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 3,
    }
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])
  
  // Subtle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.95}
          roughness={0.05}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
        />
      </mesh>
      
      {/* Inner glow mesh */}
      <mesh geometry={geometry} position={[0, 0, -0.01]} scale={0.98}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </Float>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#ffffff" />
    </>
  )
}

export function VercelTriangle3D() {
  return (
    <div className="w-[280px] h-[280px] relative">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Lights />
        <Triangle />
        <Environment preset="city" />
      </Canvas>
      
      {/* Subtle glow effect behind */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      </div>
    </div>
  )
}
