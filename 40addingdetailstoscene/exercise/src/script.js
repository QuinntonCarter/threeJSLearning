import * as dat from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// import firefliesVertexShader from "./shaders/fireflies/vertex.glsl";
// import firefliesFragmentShader from "./shaders/fireflies/fragment.glsl";

import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";

/**
 * Base
 */
// Debug
const debugObject = {};
const gui = new dat.GUI({
  width: 400,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// texutres
const bakedTexture = textureLoader.load("rerebakedFinal.jpg");
bakedTexture.flipY = false;
bakedTexture.colorSpace = THREE.SRGBColorSpace;

// materials
// baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

// portal light material
// const portalLightMaterial = new THREE.MeshBasicMaterial({
//   color: "#c6dee5",
// });
const portalLightMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color("#5fa581") },
    uColorEnd: { value: new THREE.Color("#787891") },
  },
  vertexShader: portalVertexShader,
  fragmentShader: portalFragmentShader,
});
// start 5fa581
// end 787891
debugObject.portalColorStart = "#5fa581";
debugObject.portalColorEnd = "#787891";
gui.addColor(debugObject, "portalColorStart").onChange(() => {
  portalLightMaterial.uniforms.uColorStart.value.set(
    debugObject.portalColorStart
  );
});
gui.addColor(debugObject, "portalColorEnd").onChange(() => {
  portalLightMaterial.uniforms.uColorEnd.value.set(debugObject.portalColorEnd);
});

// pole light material
const poleEmissionMaterial = new THREE.MeshBasicMaterial({
  color: "goldenrod",
});

// gltf model
gltfLoader.load("threeJSJourney37Final1.5.glb", (gltf) => {
  const bakedMesh = gltf.scene.children.find((child) => child.name === "scene");
  //   find by name
  const poleLightAMesh = gltf.scene.children.find(
    (child) => child.name === "lightBulbOne"
  );
  const poleLightMeshTwo = gltf.scene.children.find(
    (child) => child.name === "lightBulbTwo"
  );
  const portalLightMesh = gltf.scene.children.find(
    (child) => child.name === "portalLight"
  );
  bakedMesh.material = bakedMaterial;
  portalLightMesh.material = portalLightMaterial;
  poleLightAMesh.material = poleEmissionMaterial;
  poleLightMeshTwo.material = poleEmissionMaterial;

  scene.add(gltf.scene);
});
// scene.background = new THREE.TextureLoader().load("Mystic_mountaindddd.jpg");

// fireflies: Mesh is small, practice this w brunos mesh and files later
// geometry
// const firefliesGeometry = new THREE.BufferGeometry();
// const firefliesCount = 30;
// const positionArr = new Float32Array(firefliesCount * 3);
// for (let i = 0; i < firefliesCount; i++) {
//   positionArr[i * 3 + 0] = (Math.random() - 0.5) * 4;
//   positionArr[i * 3 + 1] = Math.random() * 1.5;
//   positionArr[i * 3 + 2] = (Math.random() - 0.5) * 4;
// }

// firefliesGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positionArr, 3)
// );
// material
// const firefliesMaterial = new THREE.PointsMaterial({
//   size: 0.03,
//   sizeAttenuation: true,
// });
// const firefliesMaterial = new THREE.ShaderMaterial({
//   uniforms: {

//   },
//   vertexShader: firefliesVertexShader,
//   fragmentShader: firefliesFragmentShader,
// });

// points
// const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);
// scene.add(fireflies);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.colorSpace = THREE.SRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

debugObject.clearColor = "#ff0000";
gui.addColor(debugObject, "clearColor").onChange(() => {
  renderer.setClearColor(debugObject.clearColor);
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // update shader materials
  portalLightMaterial.uniforms.uTime.value = elapsedTime;
  // firefliesMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
