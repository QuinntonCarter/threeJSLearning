import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import alphaTex from '../static/textures/door/alpha.jpg'
import ambientOcclusionTex from '../static/textures/door/ambientOcclusion.jpg'
import colorTex from '../static/textures/door/color.jpg'
import heightTex from '../static/textures/door/height.jpg'
import metalnessTex from '../static/textures/door/metalness.jpg'
import normalTex from '../static/textures/door/normal.jpg'
import roughnessTex from '../static/textures/door/roughness.jpg'
import matCapTex from '../static/textures/matcaps/6.png'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Textures
const textureLoader = new THREE.TextureLoader()
const alphaTexture = textureLoader.load(alphaTex)
const heightTexture = textureLoader.load(heightTex)
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionTex)
const normalTexture = textureLoader.load(normalTex)
const metalnessTexture = textureLoader.load(metalnessTex)
const roughnessTexture = textureLoader.load(roughnessTex)
const colorTexture = textureLoader.load(colorTex)
const matCapTexture = textureLoader.load(matCapTex)

// objects
// const material = new THREE.MeshBasicMaterial({ map: matCapTexture })
const material = new THREE.MeshBasicMaterial()
// OR w no argument
material.map = colorTexture
// OR FOR COLORS
// material.color.set('lime')
// OR
// material.wireframe = true
// material.color = new THREE.Color('#0f0')
// material.opacity = 0.5
material.transparent = true
material.alphaMap = alphaTexture

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = -1.5
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    // update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()