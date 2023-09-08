import { useGLTF } from "@react-three/drei";
// not necessary if using useGLTF helper, not even DRACO decoder
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default function Model() {
  //   const model = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("./draco/");
  //     loader.setDRACOLoader(dracoLoader);
  //   });
  const model = useGLTF("./hamburger.glb");
  console.log(model);
  return <primitive object={model.scene} scale={0.35} position={[0, -1, 0]} />;
}
