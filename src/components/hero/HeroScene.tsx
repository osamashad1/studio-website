"use client";

import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { BLOCKS, COLORS, WINDOW } from "./blocks";

const S = 0.01; // 1 window pixel = 0.01 scene units → window is 6 × 4.18 units
const DEPTH = 0.34;
const ASSEMBLE = 1.6; // seconds each block flies
const easeOut = (p: number) => 1 - Math.pow(1 - p, 4);
const deg = THREE.MathUtils.degToRad;

type Props = {
  /** 0 → 1 while the hero scrolls out of view (drives the camera move). */
  scrollRef: React.RefObject<number>;
  active: boolean;
  onReady: () => void;
};

export default function HeroScene({ scrollRef, active, onReady }: Props) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 32, position: [0, 0, 12] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => requestAnimationFrame(onReady)}
      aria-hidden
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[-4, 6, 6]} intensity={2.2} />
      <pointLight position={[4, -2, -3]} intensity={30} color={COLORS.cobalt} />
      {/* Studio light without downloading an HDR file (no external requests) */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={3} position={[0, 4, 4]} scale={[10, 2, 1]} />
        <Lightformer intensity={1.5} position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} />
        <Lightformer intensity={2} color={COLORS.cobaltLight} position={[6, -1, -2]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} />
        <Lightformer intensity={1.2} color={COLORS.signal} position={[0, -5, 2]} rotation-x={-Math.PI / 2} scale={[4, 2, 1]} />
      </Environment>
      <BrowserBlocks scrollRef={scrollRef} />
    </Canvas>
  );
}

function BrowserBlocks({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0); // animation time; advances max 1/30 s per frame so slow frames never skip the fly-in

  const items = useMemo(
    () =>
      BLOCKS.map((b, i) => {
        const target = new THREE.Vector3(
          (b.x + b.w / 2 - WINDOW.w / 2) * S,
          -(b.y + b.h / 2 - WINDOW.h / 2) * S,
          0,
        );
        return {
          ...b,
          target,
          from: target.clone().add(new THREE.Vector3(...b.from).multiplyScalar(S)),
          delay: b.accent ? 0.9 : 0.1 + i * 0.07,
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    time.current += Math.min(delta, 1 / 30);
    const t = time.current;

    // 1) Fly-in: each block moves from its scattered start to its place in the window.
    items.forEach((it, i) => {
      const m = meshes.current[i];
      if (!m) return;
      const e = easeOut(THREE.MathUtils.clamp((t - it.delay) / ASSEMBLE, 0, 1));
      m.position.lerpVectors(it.from, it.target, e);
      m.rotation.set(deg(it.spin * 0.6) * (1 - e), deg(-it.spin) * (1 - e), deg(it.spin) * (1 - e));
      // Before its turn a block is shrunk to (almost) nothing instead of hidden, so the GPU
      // prepares all materials up front and there is no stutter when it appears.
      m.scale.setScalar(t > it.delay ? 0.55 + 0.45 * e : 0.0001);
    });

    // 2) After assembly: gentle float + tilt toward the mouse. 3) Scroll moves the camera.
    const scroll = scrollRef.current ?? 0;
    const settled = THREE.MathUtils.clamp((t - 2.2) / 0.8, 0, 1);
    const targetY = -0.28 + state.pointer.x * 0.3 * settled;
    const targetX = 0.12 - state.pointer.y * 0.18 * settled + scroll * 0.5;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 4, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 4, delta);
    g.position.y = Math.sin(t * 0.9) * 0.08 * settled + scroll * 1.2;

    // Fit the window into the canvas on any screen shape, then dolly back on scroll.
    const cam = state.camera as THREE.PerspectiveCamera;
    const tan = Math.tan(deg(cam.fov / 2));
    const aspect = state.size.width / state.size.height;
    const fit = Math.max(5.6 / 2 / tan, 7.6 / 2 / (tan * aspect));
    cam.position.z = fit * (1 + scroll * 0.25);
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <RoundedBox
          key={it.name}
          ref={(m: THREE.Mesh | null) => {
            meshes.current[i] = m;
          }}
          args={[it.w * S, it.h * S, DEPTH]}
          radius={0.09}
          smoothness={4}
          scale={0.0001}
        >
          <meshPhysicalMaterial
            color={it.accent ? COLORS.signal : it.light ? COLORS.cobaltLight : COLORS.cobalt}
            emissive={it.accent ? COLORS.signal : COLORS.cobalt}
            emissiveIntensity={it.accent ? 0.18 : 0.06}
            roughness={0.2}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={1.3}
          />
        </RoundedBox>
      ))}
    </group>
  );
}
