import * as THREE from "three";
import * as dat from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { GroundProjectedSkybox } from "three/examples/jsm/objects/GroundProjectedSkybox.js";

// Loaders
// loads gltf **
const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();
const exrLoader = new EXRLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
const global = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Update all materials **
const updateAllMaterials = () => {
  // traverse [method]: called for each child of scene (like mapping(?) or forEach(?)) **
  scene.traverse((child) => {
    if (child.isMesh && child.material.isMeshStandardMaterial) {
      child.material.envMapIntensity = global.envMapIntensity;
    }
  });
};

// Environment Map
// add blurry to background **
scene.backgroundBlurriness = 0;
scene.backgroundIntensity = 1.3;

gui.add(scene, "backgroundBlurriness").min(0).max(1).step(0.001);
gui.add(scene, "backgroundIntensity").min(0).max(10).step(0.001);

// global map intensity **
global.envMapIntensity = 1;
gui
  .add(global, "envMapIntensity")
  .min(0)
  .max(10)
  .step(0.001)
  .onChange(updateAllMaterials);

// LDR (low dynamic range) Cube texture
// textures MUST be loaded in this (x, y, z) order => positive x, negative x, positive y, negative y, positive z, negative z **
// const environmentMap = cubeTextureLoader.load([
//   "/environmentMaps/0/px.png",
//   "/environmentMaps/0/nx.png",
//   "/environmentMaps/0/py.png",
//   "/environmentMaps/0/ny.png",
//   "/environmentMaps/0/pz.png",
//   "/environmentMaps/0/nz.png",
// ]);

// // add env map to scene **
// scene.environment = environmentMap;
// scene.background = environmentMap;

// RGBE (red, green, blue exponent); in the encoding for the HDR format
// HDR (RGBE) equirectangular
// rgbeLoader.load("/environmentMaps/blender-2kJourney2.hdr", (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = environmentMap;
//   scene.environment = environmentMap;
// });

// **
// HDR EXR equirectangular ** can download more AI generated exr/hdr files @ https://skybox.blockadelabs.com/
// exrLoader.load("/environmentMaps/nvidiaCanvas-4k.exr", (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = environmentMap;
//   scene.environment = environmentMap;
// });

// LDR EXR **
const environmentMap = textureLoader.load("/environmentMaps/ldrEXR.jpg");
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
// LDR EXR will need the colorSpace param to be set to SRGBColorSpace (normalizes image) **
environmentMap.colorSpace = THREE.SRGBColorSpace;
scene.background = environmentMap;
scene.environment = environmentMap;

// ** Ground projected skybox
rgbeLoader.load("/environmentMaps/2/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = environmentMap;

  // Skybox: allows mesh to rest on "skybox" surface **
  const skybox = new GroundProjectedSkybox(environmentMap);
  skybox.radius = 120;
  skybox.height = 11;
  // setScalar changes size of skybox **
  skybox.scale.setScalar(50);
  scene.add(skybox);

  gui.add(skybox, "radius", 1, 200, 0.1).name("SkyboxRadius");
  gui.add(skybox, "height", 1, 200, 0.1).name("SkyboxHeight");
});

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 1,
    color: 0xaaaaaa,
  })
);
// torusKnot.material.envMap = environmentMap;
torusKnot.position.x = -4;
torusKnot.position.y = 4;
scene.add(torusKnot);

// Models **
gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);

  updateAllMaterials();
});
// **

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
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
