import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./component/Experience.jsx";
import * as THREE from "three";
const root = ReactDOM.createRoot(document.querySelector("#root"));

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [3, 2, 6],
  //   zoom: 100,
};

root.render(
  <Canvas
    dpr={1}
    //   orthographic
    // flat // removes tone mapping/creates linear tonemapping
    camera={cameraSettings}
    gl={{
      antialias: false,
      //   toneMapping: THREE.CineonToneMapping,
      toneMapping: THREE.ACESFilmicToneMapping,
      ouputColorSpace: THREE.SRGBColorSpace,
    }}
  >
    <Experience />
  </Canvas>
);
