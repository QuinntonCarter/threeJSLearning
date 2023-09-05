import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const created = ({ scene }) => {
  //   gl.setClearColor("#ff0000", 1);
  //   OR
  //   scene.background = new THREE.Color("red");
  // OR
};

root.render(
  <Canvas
    shadows
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
    // returns state obj containing gl property
    onCreated={created}
  >
    {/* is the same as new THREE.Color() */}
    <Experience />
  </Canvas>
);
