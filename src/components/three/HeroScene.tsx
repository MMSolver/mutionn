"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Environment,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";

function DistortedSphere({
  position = [0, 0, 0] as [number, number, number],
  color = "#06B6D4",
  speed = 1,
  distort = 0.4,
  radius = 1,
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15 * speed;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2 * speed;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[radius, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={1.5}
          roughness={0.3}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus({
  position = [0, 0, 0] as [number, number, number],
  color = "#0891B2",
  speed = 1,
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4 * speed;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25 * speed;
  });

  return (
    <Float speed={1.2} rotationIntensity={1.5} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.8, 0.3, 32, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron({
  position = [0, 0, 0] as [number, number, number],
  color = "#A3A3A3",
  speed = 1,
  size = 0.8,
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15 * speed;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.85}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleField({
  count = 400,
  color = "#06B6D4",
}) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.4}
      />
    </points>
  );
}

interface HeroSceneProps {
  className?: string;
}

export function HeroScene({ className }: HeroSceneProps) {
  return (
    <div className={className ?? "absolute inset-0 -z-10"}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#FAFAFA" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#06B6D4"
        />

        <DistortedSphere
          position={[-0.5, 0.3, 0]}
          color="#06B6D4"
          radius={1.4}
          distort={0.35}
        />
        <FloatingTorus
          position={[2.5, -0.8, -1.5]}
          color="#0891B2"
          speed={0.8}
        />
        <FloatingIcosahedron
          position={[-2.2, 1.8, -2.5]}
          color="#737373"
          speed={0.6}
        />

        <ParticleField count={350} color="#06B6D4" />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
