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
  DepthOfField,
  SSR,
} from "@react-three/postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";
import { useControls } from "leva";
import Drunk from "./Drunk";

export default function Experience() {
  const drunkRef = useRef(null);
  // const ssrProps = useControls("SSR Effect", {
  //   temporalResolve: true,
  //   STRETCH_MISSED_RAYS: true,
  //   USE_MRT: true,
  //   USE_NORMALMAP: true,
  //   USE_ROUGHNESSMAP: true,
  //   ENABLE_JITTERING: true,
  //   ENABLE_BLUR: true,
  //   temporalResolveMix: { value: 0.9, min: 0, max: 1 },
  //   temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
  //   maxSamples: { value: 0, min: 0, max: 1 },
  //   resolutionScale: { value: 1, min: 0, max: 1 },
  //   blurMix: { value: 0.5, min: 0, max: 1 },
  //   blurKernelSize: { value: 8, min: 0, max: 8 },
  //   blurSharpness: { value: 0.5, min: 0, max: 1 },
  //   rayStep: { value: 0.3, min: 0, max: 1 },
  //   intensity: { value: 1, min: 0, max: 5 },
  //   maxRoughness: { value: 0.1, min: 0, max: 1 },
  //   jitter: { value: 0.7, min: 0, max: 5 },
  //   jitterSpread: { value: 0.45, min: 0, max: 1 },
  //   jitterRough: { value: 0.1, min: 0, max: 1 },
  //   roughnessFadeOut: { value: 1, min: 0, max: 1 },
  //   rayFadeOut: { value: 0, min: 0, max: 1 },
  //   MAX_STEPS: { value: 20, min: 0, max: 20 },
  //   NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
  //   maxDepthDifference: { value: 3, min: 0, max: 10 },
  //   maxDepth: { value: 1, min: 0, max: 1 },
  //   thickness: { value: 10, min: 0, max: 10 },
  //   ior: { value: 1.45, min: 0, max: 2 },
  // });

  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });

  return (
    <>
      <color args={["#ffffff"]} attach="background" />
      <EffectComposer disableNormalPass multisampling={4}>
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
        {/* luminanceThreshold sets the threshold above which materials will start to glow  */}
        {/* <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} /> */}
        {/* <DepthOfField
          focusDistance={0.025}
          focallength={0.025}
          bokehScale={6}
        /> */}
        {/* <SSR {...ssrProps} /> */}
        <Drunk ref={drunkRef} {...drunkProps} />
      </EffectComposer>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
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
        {/* <meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} /> */}
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        // doesn't work without shadows enabled on canvas in index.jxs
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial
          toneMapped={false}
          color="greenyellow"
          metalness={0}
          roughness={0}
        />
      </mesh>
    </>
  );
}
