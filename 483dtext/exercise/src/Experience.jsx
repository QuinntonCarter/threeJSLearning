import { useState, useEffect, useRef } from "react";
import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();
const donutMaterial = new THREE.MeshMatcapMaterial();
export default function Experience() {
  // ** set
  const donutMatcap = useMatcapTexture("46804D_CBE9AC_90B57C_95D38F", 256);
  const [matcapTexture] = useMatcapTexture("F77777_FBE1E1_FAB2B2_FBC4C4", 256);
  const [torusGeometry, setTorusGeometry] = useState();

  //   const [material, setMaterial] = useState();
  //   const [donutMaterial, setDonutMaterial] = useState();
  const donutsGroupRef = useRef(null);

  useEffect(() => {
    // sets proper color encoding
    matcapTexture.colorSpace = THREE.SRGBColorSpace;

    // set text material on load
    material.matcap = matcapTexture;
    material.needsUpdate = true;

    // set donut material
    donutMaterial.matcap = donutMatcap[0];
    donutMaterial.needsUpdate = true;
    console.log(donutsGroupRef);
  }, []);

  //  useFrame for animating donuts (or anything)
  useFrame((state, delta) => {
    for (const donut of donutsGroupRef.current.children) {
      donut.rotation.y += delta * 1;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      {/* <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}
      {/* <meshMatcapMaterial ref={setDonutMaterial} matcap={donutMatcap[0]} /> */}

      {/* <mesh scale={1.5}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
      <Center>
        {/* default 3d text material is mesh basic material */}
        <Text3D
          // for use with setState()
          material={material}
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          BARB13
          {/* <meshNormalMaterial /> */}
        </Text3D>
      </Center>
      <group ref={donutsGroupRef}>
        {[...Array(100)].map((value, index) => (
          <mesh
            key={index}
            material={donutMaterial}
            //   for use with setState()
            //   material={donutMaterial}
            geometry={torusGeometry}
            position={[
              (Math.random() - 0.5) * index,
              (Math.random() - 0.5) * index,
              (Math.random() - 0.5) * index,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI,
            ]}
          >
            {/* <meshMatcapMaterial matcap={donutMatcap[0]} /> */}
          </mesh>
        ))}
      </group>
    </>
  );
}
