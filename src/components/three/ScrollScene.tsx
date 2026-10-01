"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useTranslation } from "@/lib/useTranslation";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

const ACCENT = "#D4874B";
const ACCENT_DARK = "#A0663A";
const SURFACE = "#242424";
const BG = "#0A0A0A";

const scrollStore = { progress: 0 };
const mouseStore = { x: 0, y: 0 };

// ─── Helix DNA-style data streams ───
function DataHelix({ direction = 1 }: { direction?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 80;

  const { spheres, connectors } = useMemo(() => {
    const spheres: { pos: THREE.Vector3; color: string }[] = [];
    const connectors: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 6;
      const y = (i / count) * 12 - 6;
      const r = 1.8;

      const x1 = Math.cos(t) * r;
      const z1 = Math.sin(t) * r;
      const x2 = Math.cos(t + Math.PI) * r;
      const z2 = Math.sin(t + Math.PI) * r;

      spheres.push({
        pos: new THREE.Vector3(x1, y, z1),
        color: i % 3 === 0 ? ACCENT : SURFACE,
      });
      spheres.push({
        pos: new THREE.Vector3(x2, y, z2),
        color: i % 5 === 0 ? ACCENT : SURFACE,
      });

      if (i % 4 === 0) {
        connectors.push({
          start: new THREE.Vector3(x1, y, z1),
          end: new THREE.Vector3(x2, y, z2),
        });
      }
    }
    return { spheres, connectors };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const t = scrollStore.progress;
    groupRef.current.rotation.y = time * 0.08 * direction + t * Math.PI;
    groupRef.current.position.y = Math.sin(t * Math.PI) * 2;
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <mesh key={`s-${i}`} position={s.pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color === ACCENT ? ACCENT : "#000000"}
            emissiveIntensity={s.color === ACCENT ? 0.5 : 0}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
      {connectors.map((c, i) => (
        <Line key={`c-${i}`} start={c.start} end={c.end} color={ACCENT_DARK} opacity={0.15} />
      ))}
    </group>
  );
}

// ─── Simple line component ───
function Line({
  start,
  end,
  color,
  opacity = 1,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  opacity?: number;
}) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        [start.x, start.y, start.z, end.x, end.y, end.z],
        3
      )
    );
    return g;
  }, [start, end]);

  return (
    <line geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}

// ─── Energy pulse wave ───
const PULSE_INTERVAL = 5;
const PULSE_DURATION = 2;

function EnergyPulse() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const mat1Ref = useRef<THREE.MeshStandardMaterial>(null);
  const mat2Ref = useRef<THREE.MeshStandardMaterial>(null);
  const mat3Ref = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const cycle = time % PULSE_INTERVAL;
    const active = cycle < PULSE_DURATION;

    const rings = [
      { mesh: ring1Ref.current, mat: mat1Ref.current, delay: 0 },
      { mesh: ring2Ref.current, mat: mat2Ref.current, delay: 0.15 },
      { mesh: ring3Ref.current, mat: mat3Ref.current, delay: 0.3 },
    ];

    rings.forEach(({ mesh, mat, delay }) => {
      if (!mesh || !mat) return;
      const t = Math.max(0, cycle - delay) / (PULSE_DURATION - delay);

      if (active && t >= 0 && t <= 1) {
        const ease = 1 - Math.pow(1 - t, 3);
        const scale = 0.5 + ease * 8;
        mesh.scale.setScalar(scale);
        mat.opacity = (1 - ease) * 0.35;
        mesh.visible = true;
      } else {
        mesh.visible = false;
      }
    });
  });

  return (
    <group>
      {[ring1Ref, ring2Ref, ring3Ref].map((ref, i) => (
        <mesh key={i} ref={ref} rotation={[Math.PI / 2, 0, 0]} visible={false}>
          <torusGeometry args={[1, 0.03 - i * 0.008, 16, 80]} />
          <meshStandardMaterial
            ref={[mat1Ref, mat2Ref, mat3Ref][i]}
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={1.5}
            transparent
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Burst particles on pulse ───
function BurstParticles({ count = 60 }) {
  const ref = useRef<THREE.Points>(null);

  const { directions, speeds } = useMemo(() => {
    const directions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      directions[i * 3] = Math.sin(phi) * Math.cos(theta);
      directions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta);
      directions[i * 3 + 2] = Math.cos(phi);
      speeds[i] = 3 + Math.random() * 5;
    }
    return { directions, speeds };
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    const cycle = time % PULSE_INTERVAL;
    const t = cycle / PULSE_DURATION;

    if (cycle < PULSE_DURATION) {
      ref.current.visible = true;
      const posArr = ref.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < count; i++) {
        const dist = t * speeds[i];
        posArr[i * 3] = directions[i * 3] * dist;
        posArr[i * 3 + 1] = directions[i * 3 + 1] * dist;
        posArr[i * 3 + 2] = directions[i * 3 + 2] * dist;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;

      const mat = ref.current.material as THREE.PointsMaterial;
      mat.opacity = Math.max(0, 1 - t) * 0.8;
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <points ref={ref} visible={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={ACCENT}
        size={0.06}
        transparent
        opacity={0}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Core flash light ───
function CoreFlash() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const time = state.clock.getElapsedTime();
    const cycle = time % PULSE_INTERVAL;

    if (cycle < 0.4) {
      const t = cycle / 0.4;
      const flash = Math.pow(1 - t, 2);
      lightRef.current.intensity = flash * 4;
    } else {
      lightRef.current.intensity = 0;
    }
  });

  return (
    <pointLight ref={lightRef} color={ACCENT} distance={15} intensity={0} />
  );
}

// ─── Central geometric core ───
function GeometricCore() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const innerMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const t = scrollStore.progress;

    if (outerRef.current) {
      outerRef.current.rotation.x = time * 0.15 + t * Math.PI;
      outerRef.current.rotation.y = time * 0.1;
      outerRef.current.rotation.z = Math.sin(time * 0.2) * 0.3;
      const s = 1.6 - t * 0.4;
      outerRef.current.scale.setScalar(s);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.2;
      innerRef.current.rotation.y = time * 0.15 + t * Math.PI * 0.5;
      const s = 0.9 + Math.sin(time * 0.5) * 0.1;
      innerRef.current.scale.setScalar(s);
    }

    // Pulse glow on inner core
    if (innerMatRef.current) {
      const cycle = time % PULSE_INTERVAL;
      if (cycle < 0.6) {
        const flash = Math.pow(1 - cycle / 0.6, 2);
        innerMatRef.current.emissiveIntensity = 0.2 + flash * 1.5;
      } else {
        innerMatRef.current.emissiveIntensity = 0.2;
      }
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.3) * 0.2;
      ringRef.current.rotation.z = time * 0.2;
      ringRef.current.scale.setScalar(2.2 + Math.sin(time * 0.4) * 0.2);
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 3;
      ring2Ref.current.rotation.y = -time * 0.15;
      ring2Ref.current.scale.setScalar(2.8 + Math.cos(time * 0.3) * 0.15);
    }
  });

  return (
    <group>
      {/* Outer wireframe icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color={ACCENT}
          wireframe
          transparent
          opacity={0.25}
          emissive={ACCENT}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Inner solid dodecahedron */}
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          ref={innerMatRef}
          color={ACCENT}
          metalness={0.95}
          roughness={0.1}
          emissive={ACCENT}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1, 0.015, 16, 100]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1, 0.01, 16, 100]} />
        <meshStandardMaterial
          color={ACCENT_DARK}
          emissive={ACCENT_DARK}
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Pulse effects */}
      <EnergyPulse />
      <BurstParticles />
      <CoreFlash />
    </group>
  );
}

// ─── Floating data nodes with connections ───
function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 40;

  const nodes = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 18
        )
      );
    }
    return arr;
  }, []);

  const connections = useMemo(() => {
    const conns: { a: number; b: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 5) {
          conns.push({ a: i, b: j });
        }
      }
    }
    return conns;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const t = scrollStore.progress;
    groupRef.current.rotation.y = time * 0.02 + t * 0.5;
    groupRef.current.rotation.x = Math.sin(t * Math.PI) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={`n-${i}`} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={i % 4 === 0 ? ACCENT : SURFACE}
            emissive={i % 4 === 0 ? ACCENT : "#000000"}
            emissiveIntensity={i % 4 === 0 ? 0.6 : 0}
          />
        </mesh>
      ))}
      {connections.map((conn, i) => (
        <Line
          key={`l-${i}`}
          start={nodes[conn.a]}
          end={nodes[conn.b]}
          color={ACCENT_DARK}
          opacity={0.06}
        />
      ))}
    </group>
  );
}

// ─── Particle field ───
function ParticleField({ count = 500 }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const accentColor = new THREE.Color(ACCENT);
    const surfaceColor = new THREE.Color(SURFACE);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const c = Math.random() > 0.85 ? accentColor : surfaceColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = scrollStore.progress;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.015 + t * 0.3;
    ref.current.rotation.x = t * 0.2;
    ref.current.position.y = -t * 8;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

// ─── Floating geometric shards ───
function FloatingShards() {
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      scale: 0.1 + Math.random() * 0.25,
      speed: 0.3 + Math.random() * 0.7,
      type: i % 3,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const t = scrollStore.progress;

    groupRef.current.children.forEach((child, i) => {
      const shard = shards[i];
      if (!shard) return;
      child.rotation.x = time * shard.speed * 0.3;
      child.rotation.y = time * shard.speed * 0.2;
      child.position.y =
        shard.position.y + Math.sin(time * shard.speed + i) * 0.5 - t * 4;
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard, i) => (
        <mesh
          key={i}
          position={shard.position}
          rotation={shard.rotation}
          scale={shard.scale}
        >
          {shard.type === 0 ? (
            <octahedronGeometry args={[1, 0]} />
          ) : shard.type === 1 ? (
            <tetrahedronGeometry args={[1, 0]} />
          ) : (
            <boxGeometry args={[1, 1, 1]} />
          )}
          <meshStandardMaterial
            color={ACCENT_DARK}
            wireframe
            transparent
            opacity={0.15}
            emissive={ACCENT_DARK}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Mouse-reactive light ───
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x = mouseStore.x * 8;
    lightRef.current.position.y = mouseStore.y * 5 + 2;
    lightRef.current.position.z = 5;
  });

  return (
    <pointLight
      ref={lightRef}
      color={ACCENT}
      intensity={0.4}
      distance={20}
    />
  );
}

// ─── Camera rig ───
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const t = scrollStore.progress;
    const time = state.clock.getElapsedTime();

    const angle = t * Math.PI * 0.8;
    const radius = 10 - t * 3;
    const height = 3 + t * 6;

    camera.position.x =
      Math.sin(angle) * radius +
      Math.sin(time * 0.1) * 0.3 +
      mouseStore.x * 0.5;
    camera.position.y =
      height + Math.sin(time * 0.15) * 0.2 + mouseStore.y * 0.3;
    camera.position.z = Math.cos(angle) * radius;

    const lookY = -t * 3;
    camera.lookAt(0, lookY, 0);
  });

  return null;
}

// ─── Main scene ───
function Scene() {
  return (
    <>
      <CameraRig />

      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color="#FAFAFA" />
      <pointLight position={[-4, 3, -4]} intensity={0.6} color={ACCENT} distance={20} />
      <pointLight position={[4, -2, 4]} intensity={0.3} color={ACCENT_DARK} distance={15} />
      <spotLight
        position={[0, 12, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.5}
        color="#FAFAFA"
      />

      <GeometricCore />
      <DataHelix direction={1} />
      <NetworkNodes />
      <ParticleField />
      <FloatingShards />
      <MouseLight />

      <gridHelper
        args={[50, 50, ACCENT, SURFACE]}
        position={[0, -5, 0]}
        material-transparent
        material-opacity={0.08}
      />

      <Environment preset="city" />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.3}
          intensity={0.7}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.9} />
      </EffectComposer>
    </>
  );
}

// ─── Export ───
export function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      scrollStore.progress = scrollHeight > 0 ? el.scrollTop / scrollHeight : 0;
    };

    const handleMouse = (e: MouseEvent) => {
      mouseStore.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseStore.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const el = containerRef.current;
    el?.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      el?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Fixed 3D background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 3, 10], fov: 50 }}
          style={{ background: BG }}
        >
          <color attach="background" args={[BG]} />
          <fog attach="fog" args={[BG, 15, 40]} />
          <Scene />
        </Canvas>
      </div>

      {/* Scrollable HTML overlay */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Section 1: Hero */}
        <section className="flex h-screen w-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
                {t.hero.badge}
              </p>
              <h1 className="font-[family-name:var(--font-heading)] text-5xl font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-6xl lg:text-7xl">
                {t.hero.title1}{" "}
                <span className="text-[var(--accent-primary)]">
                  {t.hero.titleAccent}
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--text-secondary)]">
                {t.hero.desc}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-7 py-3.5 text-base font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
                >
                  {t.hero.cta1}
                </a>
                <a
                  href="/hizmetler"
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--border-hover)] px-7 py-3.5 text-base font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                >
                  {t.hero.cta2}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Services */}
        <section className="flex h-screen w-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="ml-auto max-w-xl text-right">
              <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
                {t.heroServices.title}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)]">
                {t.heroServices.subtitle}
              </h2>
              <div className="mt-8 space-y-3">
                {t.services.items.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-lg border border-[var(--border-default)]/50 bg-[var(--bg-primary)]/60 px-5 py-3 text-right backdrop-blur-md"
                  >
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Stats */}
        <section className="flex h-screen w-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)]">
                {t.heroStats.title}{" "}
                <span className="text-[var(--accent-primary)]">Mution</span>
              </h2>
              <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
                {[
                  { value: "50+", label: t.heroStats.projects },
                  { value: "99.9%", label: t.heroStats.uptime },
                  { value: t.heroStats.supportVal, label: t.heroStats.support },
                  { value: "15+", label: t.heroStats.clients },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-[var(--border-default)]/50 bg-[var(--bg-primary)]/60 p-6 backdrop-blur-md"
                  >
                    <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--accent-primary)] md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Testimonials */}
        <section className="flex h-screen w-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <p className="text-center text-sm font-medium uppercase tracking-widest text-[var(--accent-primary)]">
                {t.heroTestimonials.badge}
              </p>
              <h2 className="mt-2 text-center font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--text-primary)]">
                {t.heroTestimonials.title}
              </h2>

              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  {
                    name: "Ahmet Y.",
                    role: "CEO, E-Ticaret Şirketi",
                    quote:
                      "Sitemizin trafiği 3 ayda 4 katına çıktı. Teknik altyapı konusunda tam bir profesyonel.",
                  },
                  {
                    name: "Elif K.",
                    role: "Operasyon Müdürü, Lojistik Firma",
                    quote:
                      "Otomasyon çözümleri sayesinde günde 2 saat tasarruf ediyoruz. İş süreçlerimiz artık hatasız işliyor.",
                  },
                  {
                    name: "Murat D.",
                    role: "CTO, Fintech Startup",
                    quote:
                      "Güvenlik denetiminde kritik açıkları tespit edip hızla kapattı. Güvenle çalışabileceğiniz bir isim.",
                  },
                ].map((review) => (
                  <div
                    key={review.name}
                    className="flex flex-col rounded-xl border border-[var(--border-default)]/50 bg-[var(--bg-primary)]/60 p-6 backdrop-blur-md"
                  >
                    <div className="mb-3 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 fill-[var(--accent-primary)]"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)] italic">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <div className="mt-4 border-t border-[var(--border-default)]/30 pt-4">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {review.name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {review.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="flex h-screen w-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 text-center lg:px-8">
            <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border-default)]/50 bg-[var(--bg-primary)]/70 p-12 backdrop-blur-xl">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
                {t.heroCta.title}
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)]">
                {t.heroCta.desc}
              </p>
              <a
                href="/iletisim"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-8 py-4 text-base font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                {t.heroCta.button}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
