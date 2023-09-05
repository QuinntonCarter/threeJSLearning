// import { useThree, extend } from '@react-three/fiber'
import { useEffect, useRef } from "react";
import {
  Html,
  Text,
  OrbitControls,
  PivotControls,
  TransformControls,
  MeshReflectorMaterial,
  Float,
} from "@react-three/drei";

// extend({ OrbitControls })

export default function Experience() {
  // const { camera, gl } = useThree()
  const cubeRef = useRef(null);
  const sphereRef = useRef(null);

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls anchor={[0, 0, 0]} depthTest={false} lineWidth={4}>
        <mesh position-x={-2}>
          <sphereGeometry ref={sphereRef} />
          <meshStandardMaterial color="orange" wireframe={true} />
          <Html
            lang="en"
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={3}
            occlude={[sphereRef, cubeRef]}
          >
            That's a sphere 👍
          </Html>
        </mesh>
      </PivotControls>

      <mesh ref={cubeRef} scale={1.5} position-x={2}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls depthTest={false} object={cubeRef} mode="translate" />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          color="greenyellow"
          resolution={720}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.75}
        />
        {/* <meshStandardMaterial color="greenyellow" /> */}
      </mesh>
      {/* animation helper, not integer value */}
      <Float speed={2} floatIntesity={5}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={0.5}
          color="hotpink"
          position-y={1}
          // text line width
          maxWidth={2}
          textAlign={"center"}
        >
          BARBIE
          <MeshReflectorMaterial />
          {/* <meshNormalMaterial /> */}
        </Text>
      </Float>
    </>
  );
}
