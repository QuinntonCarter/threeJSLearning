import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import { useRef } from "react";
// performance monitor
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const directionalLight = useRef();
  // causes issues with AccumulativeShadows, so comment out
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  const cubeRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    // cubeRef.current.rotation.y += delta * 0.2;
  });

  // leva useControls('panelname',{ paramsToTweak: {}, moretoeTweak: ''})
  const { opacity, shadowColor, blur } = useControls("ContactShadows", {
    blur: {
      min: 1,
      max: 10,
      // value = default/initial value
      value: 3.3,
    },
    opacity: {
      min: 0.4,
      max: 10,
      // value = default/initial value
      value: 0.5,
    },
    shadowColor: "#4b2709",
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("envMapIntensity", {
      envMapIntensity: {
        // value = default/initial value
        value: 1.7,
        min: 0,
        max: 12,
      },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 20, min: 10, max: 1000 },
      envMapScale: { value: 27, min: 10, max: 1000 },
    });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  return (
    <>
      {/* literally a sky */}
      {/* not needed for environment map */}
      {/* <Sky sunPosition={sunPosition} /> */}
      {/* <Environment
        // can be removed if just want envMap lighting and have preset n no children
        // background
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          // might need to tweak the scale if envMap isn't appearing or appears with giant hole/errors
          scale: envMapScale,
        }}
        // only used if children in component that cause rerender
        // resolution={32}
        // files={[
        //   "./environmentMaps/2/px.jpg",
        //   "./environmentMaps/2/nx.jpg",
        //   "./environmentMaps/2/py.jpg",
        //   "./environmentMaps/2/ny.jpg",
        //   "./environmentMaps/2/pz.jpg",
        //   "./environmentMaps/2/nz.jpg",
        // ]}
        // files={"./environmentMaps/the_sky_is_on_fire_2k.hdr"}
      > */}
      {/* <Lightformer
          position-z={-5}
          scale={10}
          color={"red"}
          intensity={1}
          form="ring"
        />
        <color args={["#000000"]} attach={"background"} /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[2, 0, 0]} />
        </mesh> */}
      {/* </Environment> */}
      {/* don't bake with moving objects in scene */}
      {/* <BakeShadows /> */}
      {/* <color args={["ivory"]} attach="background" /> */}
      {/* performance monitor */}
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <SoftShadows
        frustrum={3.75}
        size={50}
        near={9.5}
        samples={17}
        rings={11}
      />
      {/* <AccumulativeShadows
        // {[x,y (this current value setting prevents z-fighting w shadow and plane),z]}
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        // frames={100}
        frames={Infinity}
        blend={100}
        // prevents high fps performance load freezing by causing 1 frame render on each frame
        temporal
      >
        {/* <directionalLight castShadow position={[1, 2, 3]} /> */}
      {/* <RandomizedLight
          radius={1}
          amount={8}
          ambient={0.5}
          intensity={1}
          bias={0.001}
          position={[1, 2, 3]}
        /> */}
      {/* </AccumulativeShadows> */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={shadowColor}
        opacity={opacity}
        blur={blur}
        // prevents static in shadows
        frames={1}
      /> */}
      {/* not needed for environment map */}
      {/* <directionalLight
        castShadow
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5} 
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}
      {/* not needed for environment map */}
      {/* <ambientLight intensity={0.5} /> */}
      {/* <mesh castShadow position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
      {/* <mesh castShadow position-y={1} ref={cubeRef} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
      {/* can be used to display/showcase models for review */}
      <Stage
        shadows={{
          type: "contact",
          opacity: 0.2,
          blur: 3,
        }}
        environment="sunset"
        preset="portrait"
        intensity={0.5}
      >
        <mesh castShadow position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial
            color="orange"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
        <mesh
          castShadow
          position-y={1}
          ref={cubeRef}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage>
      {/* <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
    </>
  );
}
