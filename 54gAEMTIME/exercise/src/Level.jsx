import * as THREE from "three";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

THREE.ColorManagement.legacyMode = false;

const boxGeometryTHREE = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "darkgreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategray" });

export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometryTHREE}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        material={floor1Material}
        receiveShadow
      />
    </group>
  );
}

export function BlockEnd({ position = [0, 0, 0] }) {
  // hamburger
  const { scene } = useGLTF("./hamburger.glb");

  // for each hamburger, add castshadow attribute
  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <RigidBody
        colliders="trimesh"
        type="dynamic"
        position={[0, 0.25, 0]}
        restitution={0.2}
        friction={0}
      >
        <primitive object={scene} scale={0.09} />
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          geometry={boxGeometryTHREE}
          position={[0, 0, 0]}
          scale={[4, 0.2, 4]}
          material={floor1Material}
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockSpinner({ position = [0, 0, 0] }) {
  const obstacleRef = useRef(null);
  const [speed] = useState(
    () =>
      // first part: sets rotation to switch between clockwise and counter clockwise
      // second part: with speed either -1 and 1
      (Math.random() + 0.2) * Math.random() < 0.5 ? -1 : 1
    // second part: or random value between max and min
    // (Math.random() + 0.2) * (Math.random() * 1 - -1) + -1
  );
  console.log("speed", speed);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacleRef.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      {/* floor */}
      <mesh
        geometry={boxGeometryTHREE}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        material={floor2Material}
        receiveShadow
      />
      {/* rigidbody allows for kinematic movement and other physics attributes for child mesh */}
      <RigidBody
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        ref={obstacleRef}
      >
        {/*  */}
        <mesh
          geometry={boxGeometryTHREE}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockLimbo({ position = [0, 0, 0] }) {
  const obstacleRef = useRef(null);
  const [speed] = useState(
    () =>
      // first part: sets rotation to switch between clockwise and counter clockwise
      // second part: with speed either -1 and 1
      (Math.random() + 0.2) * Math.random() < 0.5 ? -1 : 1
    // second part: or random value between max and min
    // (Math.random() + 0.2) * (Math.random() * 1 - -1) + -1
  );
  // random number * one full oscillation between neg and positive value (technically called TAU) =>
  // this creates randomness in terms of sin(x) (up and down oscillation), so multiple blocks will not
  // be moving in sync when 1a
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // added to time 1b
    // incrementally oscillating values between -1 and 1 (1.15 makes sure block never clips into floor)
    const y = Math.sin(time + timeOffset) + 1.15;
    obstacleRef.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* floor */}
      <mesh
        geometry={boxGeometryTHREE}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        material={floor2Material}
        receiveShadow
      />
      {/* rigidbody allows for kinematic movement and other physics attributes for child mesh */}
      <RigidBody
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        ref={obstacleRef}
      >
        {/*  */}
        <mesh
          geometry={boxGeometryTHREE}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockAxe({ position = [0, 0, 0] }) {
  const obstacleRef = useRef(null);
  const [speed] = useState(
    () =>
      // first part: sets rotation to switch between clockwise and counter clockwise
      // second part: with speed either -1 and 1
      (Math.random() + 0.2) * Math.random() < 0.5 ? -1 : 1
    // second part: or random value between max and min
    // (Math.random() + 0.2) * (Math.random() * 1 - -1) + -1
  );
  // random number * one full oscillation between neg and positive value (technically called TAU) =>
  // this creates randomness in terms of sin(x) (up and down oscillation), so multiple blocks will not
  // be moving in sync when 1a
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // added to time 1b
    // incrementally oscillating values between -1 and 1 (1.15 makes sure block never clips into floor)
    const x = Math.sin(time + timeOffset) * 1.25;
    obstacleRef.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* floor */}
      <mesh
        geometry={boxGeometryTHREE}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        material={floor2Material}
        receiveShadow
      />
      {/* rigidbody allows for kinematic movement and other physics attributes for child mesh */}
      <RigidBody
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        ref={obstacleRef}
      >
        {/*  */}
        <mesh
          geometry={boxGeometryTHREE}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function Bounds({ length = 1 }) {
  return (
    <>
      <RigidBody type="fixed" restitution={5} friction={0}>
        <mesh
          scale={[0.3, 1.5, 4 * length]}
          position={[2.15, 0.75, -(length * 2) + 2]}
          material={wallMaterial}
          geometry={boxGeometryTHREE}
          castShadow
        />
        <mesh
          scale={[0.3, 1.5, 4 * length]}
          position={[-2.15, 0.75, -(length * 2) + 2]}
          material={wallMaterial}
          geometry={boxGeometryTHREE}
          receiveShadow
        />
        <mesh
          scale={[4, 1.5, 0.3]}
          position={[0, 0.75, -(length * 4) + 2]}
          material={wallMaterial}
          geometry={boxGeometryTHREE}
          receiveShadow
        />
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2 + 2)]}
        />
      </RigidBody>
    </>
  );
}

export default function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
}) {
  const blocks = useMemo(() => {
    const randomBlocks = [];
    for (let i = 0; i < count; i++) {
      // math equation generates random decimal value between 0 and x (types.length), math.floor rounds number down
      const type = types[Math.floor(Math.random() * types.length)];
      randomBlocks.push(type);
      console.log(randomBlocks);
    }
    return randomBlocks;
  }, [count, types]);
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, i) => (
        // ensures count isn't in 0 index count
        <Block key={i} position={[0, 0, -(i + 1) * 4]} />
      ))}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      {/* numberoftraps + startandendblocks */}
      <Bounds length={count + 2} />
    </>
  );
}
