import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";

export default function Experience() {
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  const cube = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <BakeShadows />
      {/* <SoftShadows frustum={3.75} size={50} near={9.5} samples={17} rings={11} /> */}
      <color
        args={["ivory"]}
        attach="background"
      />
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* {[x,y (this current value setting prevents z-fighting w shadow and plane),z]} */}
      <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
      >
        {/* <directionalLight
          position={[1, 2, 3]}
          castShadow
        /> */}
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows>
      <directionalLight
        ref={directionalLight}
        position={[1, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        // try to make shadow as small as possible without distorting it excessively/cutting it
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.5} />
      <mesh
        castShadow
        position-x={-2}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh
        castShadow
        ref={cube}
        position-x={2}
        scale={1.5}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
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
