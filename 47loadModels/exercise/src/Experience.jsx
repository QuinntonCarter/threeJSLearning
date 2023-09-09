import { Suspense } from "react";
import { Float, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Placeholder from "./Placeholder.jsx";
import Hamburger from "./Hamburger.jsx";
import Fox from "./Fox.jsx";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        // sets the bias for shadow interpretation on meshes in scene
        shadow-normalBias={0.04}
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />

      {/* <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh> */}

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <Suspense fallback={<Placeholder position-y={-1} scale={[2, 3, 2]} />}>
        <Float speed={5}>
          <Hamburger scale={0.35} />
        </Float>
      </Suspense>

      <Fox />
    </>
  );
}
