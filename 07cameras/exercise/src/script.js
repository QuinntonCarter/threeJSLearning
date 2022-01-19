import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// **
// capture cursor coordinates
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', e => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = -(e.clientY / sizes.height - 0.5)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 'cyan' })
)
scene.add(mesh)

// Camera
//                                           (fov, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// ** testing OrthographicCamera **
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//     // (left
//     -1 * aspectRatio,
//     // right
//     1 * aspectRatio,
//     // top, bottom, near, far)
//     1, -1, 0.1, 100)
//     console.log(aspectRatio)
// **
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// **
// Controls
//                                  (camera, DOMelement,)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 2
// controls.update()

// **
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// **
// Animate
const clock = new THREE.Clock()

const animationTick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // 1 Update objects
    // mesh.rotation.y = elapsedTime;

    // 2 update camera
    // dynamic any angle
    // camera.position.x = cursor.x * 3
    // camera.position.y = cursor.y * 3
    // camera.lookAt(mesh.position)
    // move around cube: Math.PI allows half rotation *
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)
    controls.update()

    // 3 Render
    renderer.render(scene, camera)

    // 4 Call tick again on the next frame
    window.requestAnimationFrame(animationTick)
}

animationTick() 