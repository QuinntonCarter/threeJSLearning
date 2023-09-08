import { Clone, useGLTF } from "@react-three/drei";
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
  const model = useGLTF("./hamburger-draco.glb");
  console.log(model);
  // return <primitive object={model.scene} scale={0.35} />;
  // to clone meshes; clones use one geometry for same clones
  return (
    <>
      <Clone object={model.scene} scale={0.35} position={[4, -1, 0]} />;
      <Clone object={model.scene} scale={0.35} position={[0, -1, 0]} />;
      <Clone object={model.scene} scale={0.35} position={[-4, -1, 0]} />;
    </>
  );
}
// only preload models if going to be immediately used or repeatedly in
// application bc will preload whether they are implemented in the code or not
useGLTF.preload("./hamburger-draco.glb");
