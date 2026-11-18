"use client";

import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const GOLD = "#C9A45C";

/** Bottle outline (radius, height) turned around the Y axis → round glass flacon. */
function useLathe(points: [number, number][], segments = 72) {
  return useMemo(
    () => new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), segments),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}

function Bottle({ progress }: { progress: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const time = useRef(0);

  const glass = useLathe([
    [0, -1.5], [0.92, -1.5], [1.02, -1.4], [1.05, -1.1], [1.05, 0.7], [1.0, 0.95],
    [0.75, 1.15], [0.34, 1.25], [0.32, 1.5], [0, 1.5],
  ]);
  const liquid = useLathe([
    [0, -1.38], [0.9, -1.38], [0.94, -1.3], [0.94, 0.45], [0, 0.45],
  ]);

  useFrame((state, delta) => {
    time.current += Math.min(delta, 1 / 30);
    const g = group.current;
    if (!g) return;
    const p = progress.current ?? 0;
    // Slow idle turn + one full turn over the scroll story, gentle mouse tilt.
    g.rotation.y = time.current * 0.15 + p * Math.PI * 2;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.12, 3, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -state.pointer.x * 0.08, 3, delta);
    g.position.y = Math.sin(time.current * 0.8) * 0.06;
    const intro = Math.min(time.current / 1.8, 1);
    g.scale.setScalar(0.8 + 0.2 * (1 - Math.pow(1 - intro, 3)));
  });

  return (
    <group ref={group}>
      <mesh geometry={liquid}>
        <meshPhysicalMaterial color="#B8742A" roughness={0.15} transmission={0.55} thickness={1.2} emissive="#5a2e08" emissiveIntensity={0.35} />
      </mesh>
      <mesh geometry={glass}>
        <meshPhysicalMaterial color="#ffffff" roughness={0.04} transmission={1} thickness={0.5} ior={1.5} clearcoat={1} envMapIntensity={1.6} transparent />
      </mesh>
      {/* gold collar + cap */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.12, 48]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.22} />
      </mesh>
      <mesh position={[0, 1.78, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.62, 6]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.18} flatShading />
      </mesh>
      {/* label */}
      <mesh position={[0, -0.35, 1.06]}>
        <planeGeometry args={[0.62, 0.34]} />
        <meshStandardMaterial color="#0B0B0C" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.35, 1.065]}>
        <planeGeometry args={[0.34, 0.015]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function BottleScene({
  progress,
  frameloop,
  onReady,
}: {
  progress: React.RefObject<number>;
  frameloop: "always" | "demand" | "never";
  onReady: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={frameloop}
      camera={{ fov: 30, position: [0, 0.2, 9] }}
      gl={{ antialias: true, alpha: true }}
      onCreated={() => requestAnimationFrame(onReady)}
      aria-hidden
    >
      <ambientLight intensity={0.15} />
      <spotLight position={[4, 6, 4]} angle={0.4} penumbra={1} intensity={60} color="#ffe2b0" />
      <pointLight position={[-3, -1, 2]} intensity={8} color={GOLD} />
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={4} color="#ffe9c7" position={[0, 3, 4]} scale={[6, 1, 1]} />
        <Lightformer intensity={2} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[2, 6, 1]} />
        <Lightformer intensity={2.5} color="#f5c27a" position={[5, 0, 1]} rotation-y={-Math.PI / 2} scale={[2, 6, 1]} />
      </Environment>
      <Bottle progress={progress} />
      <Sparkles count={60} scale={[6, 6, 4]} size={2.2} speed={0.25} color={GOLD} opacity={0.7} />
    </Canvas>
  );
}
