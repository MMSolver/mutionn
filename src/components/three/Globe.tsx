"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function DottedGlobe({
  accentColor = "#D4874B",
  dotColor = "#A3A3A3",
  rotationSpeed = 0.0008,
  radius = 2,
}) {
  const globeRef = useRef<THREE.Group>(null);

  const dots = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 250;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions.push([x, y, z]);
    }

    return positions;
  }, [radius]);

  const arcs = useMemo(() => {
    const arcPositions: THREE.Vector3[][] = [];
    const connections = [
      [0, 45],
      [12, 78],
      [34, 120],
      [56, 180],
      [90, 200],
      [15, 150],
      [67, 230],
    ];

    for (const [startIdx, endIdx] of connections) {
      const start = dots[startIdx % dots.length];
      const end = dots[endIdx % dots.length];
      const points: THREE.Vector3[] = [];
      const segments = 50;

      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const x = start[0] * (1 - t) + end[0] * t;
        const y = start[1] * (1 - t) + end[1] * t;
        const z = start[2] * (1 - t) + end[2] * t;

        const len = Math.sqrt(x * x + y * y + z * z);
        const lift = 1 + 0.25 * Math.sin(t * Math.PI);
        points.push(
          new THREE.Vector3(
            (x / len) * radius * lift,
            (y / len) * radius * lift,
            (z / len) * radius * lift
          )
        );
      }

      arcPositions.push(points);
    }

    return arcPositions;
  }, [dots, radius]);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Base sphere — subtle inner glow */}
      <mesh>
        <sphereGeometry args={[radius * 0.98, 32, 32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.06} />
      </mesh>

      {/* Wireframe shell */}
      <mesh>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshBasicMaterial
          color="#2A2A2A"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Dots on surface */}
      {dots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color={dotColor} transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Connection arcs */}
      {arcs.map((points, i) => {
        const curve = new THREE.CatmullRomCurve3(points);
        return (
          <mesh key={`arc-${i}`}>
            <tubeGeometry args={[curve, 50, 0.008, 8, false]} />
            <meshBasicMaterial
              color={accentColor}
              transparent
              opacity={0.5}
            />
          </mesh>
        );
      })}

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.4, 0.006, 16, 100]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.4, 0.2]}>
        <torusGeometry args={[radius * 1.6, 0.004, 16, 100]} />
        <meshBasicMaterial color="#404040" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

interface GlobeProps {
  className?: string;
  interactive?: boolean;
}

export function Globe({ className, interactive = true }: GlobeProps) {
  return (
    <div className={className ?? "w-full h-full min-h-[400px]"}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#FAFAFA" />

        <DottedGlobe accentColor="#D4874B" dotColor="#A3A3A3" />

        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
          />
        )}
      </Canvas>
    </div>
  );
}
