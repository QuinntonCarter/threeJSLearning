import { useEffect, useMemo, useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  RigidBody,
  Physics,
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
  const cubeRef = useRef(null);
  const twisterRef = useRef(null);
  const multiCubeRef = useRef(null);

  const hamburger = useGLTF("./hamburger.glb");

  const cubesCount = 100;
  // instanced meshes
  const meshInstances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < cubesCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }
    return instances;
  }, []);

  const [hitSound] = useState(() => {
    return new Audio("./hit.mp3");
  });

  function handleJump() {
    const mass = cubeRef.current.mass();
    console.log("mass", mass);
    cubeRef.current.applyImpulse({ x: 0, y: mass * 5, z: 0 });
    cubeRef.current.applyTorqueImpulse(
      {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5,
      },
      true
    );
  }

  const collisionDetected = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twisterRef.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twisterRef.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     multiCubeRef.current.setMatrixAt(i, matrix);
  //   }
  //   console.log("first render");
  // }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      {/* adds physics helper */}
      <Physics debug gravity={[0, -9.81, 0]}>
        {/* adds basic physics for dense body to mesh */}
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        <RigidBody
          ref={cubeRef}
          position={[2, 2, 0]}
          gravityScale={1.5}
          restitution={0.5}
          friction={0.7}
          colliders={false}
        >
          <mesh castShadow onClick={handleJump}>
            <boxGeometry />
            <meshStandardMaterial color="salmon" />
          </mesh>
          <CuboidCollider mass={0.5} args={[0.5, 0.5, 0.5]} />
        </RigidBody>
        {/* <RigidBody colliders={"trimesh"}> */}
        {/* <RigidBody colliders={"hull"}> */}
        {/* <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
        >
          <CuboidCollider args={[1.5, 1.5, 0.5]} /> */}
        {/* <mesh position={[0, 1, 0]} rotation={[Math .PI * 0.5, 0, 0]}>  commented for cuboidCollider */}
        {/* <mesh>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="salmon" />
          </mesh>
        </RigidBody> */}
        {/* <RigidBody>
          <mesh castShadow position={[2, 2, 0]}>
            <boxGeometry args={[3, 2, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <mesh castShadow position={[2, 2, 3]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        <RigidBody
          type="fixed"
          onCollisionEnter={collisionDetected}
          onCollisionExit={() => console.log("exit")}
        >
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={twisterRef}
          positon={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        <RigidBody colliders={false} position={[0, 4, 0]}>
          <CylinderCollider args={[0.5, 1.25]} />
          <primitive object={hamburger.scene} scale={0.25} />
        </RigidBody>
        {/* adds bounds to plane */}
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>
        {/* instanced meshes */}
        <InstancedRigidBodies instances={meshInstances}>
          {/* args for geometry and material(s) number of instances */}
          <instancedMesh
            castShadow
            args={[null, null, cubesCount]}
            ref={multiCubeRef}
          >
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
