import { useRef } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
extend({ OrbitControls });
import CustomObject from "./CustomObject.jsx";

export default function Experience() {
  const groupRef = useRef();
  const cubeRef = useRef();
  const { camera, gl } = useThree();
  useFrame((state, deltaTime) => {
    // console.log(state)
    cubeRef.current.rotation.y += deltaTime;
    // groupRef.current.rotation.y += deltaTime;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.2} />
      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <mesh position={[-2, 0, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" wireframe={true} />
        </mesh>

        <mesh ref={cubeRef} position={[2, -0.5, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="purple" />
        </mesh>
      </group>

      <mesh
        rotation-x={Math.PI * -0.5}
        position={[0, -1, -1.2]}
        scale={[8, 8, 8]}
      >
        <planeGeometry />
        <meshStandardMaterial color="green" />
      </mesh>
      <CustomObject />
    </>
  );
}
