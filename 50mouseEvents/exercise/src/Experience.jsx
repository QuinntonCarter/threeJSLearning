import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, meshBounds } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta * 0.2;
  });

  const model = useGLTF("./hamburger.glb");
  console.log(model);
  const eventHandler = (event) => {
    console.log("event occured", event);
    cubeRef.current.material.color.set(
      `hsl(${Math.random() * 360}, 100%, 75%)`
    );
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position-x={-2} onClick={(event) => event.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial
          color={`hsl(${Math.random() * 360}, 100%, 75%)`}
        />
      </mesh>
      <primitive
        object={model.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(e) => {
          console.log("clickedeee");
          e.stopPropagation();
        }}
      />
      <mesh
        ref={cubeRef}
        // ** mesh bounds creates basically a hitbox for click interaction on associated mesh **
        // BVH (bounding view heirarchy) can be used for more accurate click interaction testing (useBVH)
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={eventHandler}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry />
        <meshStandardMaterial
          color={`hsl(${Math.random() * 360}, 100%, 75%)`}
        />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={"greenyellow"} />
      </mesh>
    </>
  );
}
