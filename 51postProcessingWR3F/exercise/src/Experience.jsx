import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Bloom,
  EffectComposer,
  Glitch,
  Noise,
  Outline,
  Pixelation,
  Vignette,
} from "@react-three/postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";

export default function Experience() {
  return (
    <>
      <color args={["#000000"]} attach="background" />
      <EffectComposer disableNormalPass multisampling={0}>
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          //   blendFunction={BlendFunction.COLOR_BURN}
          blendFunction={BlendFunction.NORMAL}
        /> */}
        {/* <Pixelation granularity={8} /> */}
        {/* <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.04]}
          //   mode={GlitchMode.CONSTANT_MILD}
        /> */}
        {/* <Noise premultiply blendFunction={BlendFunction.OVERLAY} /> */}
        {/* tone mapping clamps tone range */}
        {/* mipmapBlur improves blur spread */}
        {/* luminanceThreshold sets the threshold above which materials will start to glow */}
        <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} />
      </EffectComposer>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        {/* r, g, b */}
        {/* <meshStandardMaterial
          color={[4, 1, 2]}
          emissive="pink"
          emissiveIntensity={2}
          toneMapped={false}
        /> */}
        <meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
