import * as dat from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { Spector } from "spectorjs";
const spector = new Spector();
// spector.displayUI();

/**
 * Base
 */
// Debug
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
const portalLightMaterial = new THREE.MeshBasicMaterial({
  color: "#c6dee5",
});

// pole light material
const poleEmissionMaterial = new THREE.MeshBasicMaterial({
  color: "goldenrod",
});

// gltf model
gltfLoader.load("threeJSJourney37Final1.5.glb", (gltf) => {
  // more suitable for multiple mesh that need materials
  //   gltf.scene.traverse((child) => {
  //     child.material = bakedMaterial;
  //   });
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
// scene.background = new THREE.Color("lightblue");
scene.background = new THREE.TextureLoader().load("Mystic_mountaindddd.jpg");

/**
 * Object
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

scene.add(cube);

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
// gui.add(camera.position, "x").min(4).max(6);
// gui.add(camera.position, "y").min(2).max(6);
// gui.add(camera.position, "z").min(2).max(6);
console.log("camera position", camera.position);

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
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
