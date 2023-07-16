import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Models
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
// AND (for dracoLoader)
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
// gltfLoader.load(
//   // file path
//   "/models/FlightHelmet/glTF/FlightHelmet.gltf",
//   // this 3DObj includes a camera for the scene
//   (gltf) => {
//     // for rendering one item/child
//     // scene.add(gltf.scene.children[0]);
//     // for rendering multi piece object
//     // while (gltf.scene.children.length) {
//     //   scene.add(gltf.scene.children[0]);
//     // }
//     // OR
//     // const children = [...gltf.scene.children];
//     // for (const child of children) {
//     //   scene.add(child);
//     // }
//     // OR just add group to scene
//     scene.add(gltf.scene);
//   }
// );
// DRACO Duck
// gltfLoader.load(
//   // file path
//   "/models/Duck/glTF-Draco/Duck.gltf",
//   // this 3DObj includes a camera for the scene
//   (gltf) => {
//     // for rendering one item/child
//     // scene.add(gltf.scene.children[0]);
//     // for rendering multi piece object
//     // while (gltf.scene.children.length) {
//     //   scene.add(gltf.scene.children[0]);
//     // }
//     // OR
//     // const children = [...gltf.scene.children];
//     // for (const child of children) {
//     //   scene.add(child);
//     // }
//     // OR just add group to scene
//     scene.add(gltf.scene);
//   }
// );
// FAWX
let mixer = null;
gltfLoader.load(
  // file path
  "/models/Fox/glTF/Fox.gltf",
  // this 3DObj includes a camera for the scene
  (gltf) => {
    // for rendering one item/child
    // scene.add(gltf.scene.children[0]);
    mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[1]);
    // add frame updates to tick before play() will work
    action.play();

    // OR just add group to scene
    gltf.scene.scale.set(0.025, 0.025, 0.025);
    scene.add(gltf.scene);
  }
);

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#444444",
    metalness: 0,
    roughness: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(2, 2, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  // allows animation update for obj(s)
  if (mixer !== null) {
    // mixer update for obj animation
    mixer.update(deltaTime);
  }
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
