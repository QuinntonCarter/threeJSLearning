import {
  Environment,
  Float,
  useGLTF,
  PresentationControls,
  ContactShadows,
  Html,
  Text,
} from "@react-three/drei";
import { Suspense } from "react";

export default function Experience() {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  return (
    <>
      <Environment preset="city" />
      <color args={["#241a1a"]} attach={"background"} />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        // vertical rotation
        polar={[-0.4, 0.2]}
        // horizontal rotation
        azimuth={[-1, 0.75]}
        // spring type params; adds bounciness to rotation(s)
        config={{ mass: 2, tension: 400 }}
        // snaps model back to original transform location/rotation state(s)
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          {/* for screen glow on laptop */}
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#ff6900"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={scene} position={[0, -1, 0]}>
            {/* transform allows for transformations */}
            <Html
              lang="en"
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe title="iframe test" src="https://bruno-simon.com/html" />

            <Text font="./52funSimplePortfolio/exercise/public/MedicineDrops-1GKwZ.otf">
            </Text>
          </primitive>
          <Text> BARBIE </Text>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
