import { OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";
import Cube from "./Cube";
import { Perf } from "r3f-perf";

export default function Experience() {
  const { perfVisible } = useControls({
    perfVisible: true,
  });

  const { position, color, visible } = useControls("Sphere", {
    position: {
      value: {
        x: -2,
        y: 0,
      },
      step: 0.01,
      joystick: "invertY",
    },
    // supports, rgb, text name, hsl, hsla, and {r: '' g: '', b: ''} (r:g:b:) not well supported by ThreeJS
    color: "rgb(255, 0, 0)",
    visible: true,
    myIntervalExample: {
      min: 0,
      max: 10,
      value: [4, 5],
    },
    clickMeToConsoleLog: button(() => {
      console.log("BARBIE");
    }),
    choice: { options: ["a", "b", "c"] },
  });

  const { scale } = useControls("Cube", {
    scaleSliderExample: {
      value: 1.5,
      step: 0.01,
      min: 0,
      max: 5,
    },
  });

  return (
    <>
      {perfVisible ? <Perf position="top-left" /> : null}

      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[position.x, position.y, 0]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <Cube scale={scale} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
