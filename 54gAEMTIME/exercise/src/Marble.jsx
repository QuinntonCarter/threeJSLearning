import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Marble() {
  const bodyRef = useRef(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  const [smoothedCameraPosition] = useState(
    // arguments set initial camera position
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const jump = () => {
    const origin = bodyRef.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit.toi < 0.15) {
      bodyRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => {
        return state.jump;
      },
      (value) => {
        if (value) {
          jump();
        }
      }
    );
    // runs this function when component is destroyed
    return () => {
      unsubscribeJump();
    };
  }, []);

  useFrame((state, delta) => {
    // destructor key values from inputs
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 1 * delta;

    // controls
    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    // moves player
    bodyRef.current.applyImpulse(impulse);
    // rotates player (marble) body
    bodyRef.current.applyTorqueImpulse(torque);

    // camera
    const bodyPosition = bodyRef.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    // makes camera follow marble
    const cameraTarget = new THREE.Vector3();
    // set target to player bodyPosition
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;
    // method for use on initial value, increments value closer to destination (argument)
    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
  }, []);

  return (
    <>
      <RigidBody
        ref={bodyRef}
        colliders="ball"
        restitution={0.2}
        friction={1}
        position={[0, 1, 0]}
        // damping = 'dampens' acceleration; linearly and angularly
        linearDamping={0.5}
        angularDamping={0.5}
        // prevents object from entering sleep when not moving which
        // would prevent player from moving
        canSleep={false}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial color="gray" flatShading />
        </mesh>
      </RigidBody>
    </>
  );
}
