import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import color from '../static/textures/door/color.jpg';
import alpha from '../static/textures/door/alpha.jpg';
import height from '../static/textures/door/height.jpg';
import normal from '../static/textures/door/normal.jpg';
import ambientOcclusion from '../static/textures/door/ambientOcclusion.jpg';
import metal from '../static/textures/door/metalness.jpg';
import roughness from '../static/textures/door/roughness.jpg';
import checkerboard from '../static/textures/checkerboard-1024x1024.png';
import checkerboardsml from '../static/textures/checkerboard-8x8.png';
import diamondBlock from '../static/textures/minecraft.png';

// Textures
// const image = new Image()
// const texture = new THREE.Texture(image)
// image.onload = () => {
//     texture.needsUpdate = true
// }
// // or with eventListener
// image.src = '/textures/door/color.jpg'
// ** OR **
// loading manager
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
    console.log('Start')
}
loadingManager.onLoad = () => {
    console.log('load')
}
loadingManager.onProgress = () => {
    console.log('progress')
}
loadingManager.onError = () => {
    console.log('error')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
// can load mulitple textures
const colorTexture = textureLoader.load(color)
const checkboard = textureLoader.load(checkerboard)
const checkboardsml = textureLoader.load(checkerboardsml)
const diamond = textureLoader.load(diamondBlock)
const alphaTexture = textureLoader.load(alpha)
const heightTexture = textureLoader.load(height)
const normalTexture = textureLoader.load(normal)
const ambientOcclusionTexture = textureLoader.load(ambientOcclusion)
const metalTexture = textureLoader.load(metal)
const roughnessTexture = textureLoader.load(roughness)

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.rotation = Math.PI / 4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

diamond.generateMipmaps = false
diamond.minFilter = THREE.NearestFilter
diamond.magFilter = THREE.NearestFilter

// error handling/viewing
// const texture = textureLoader.load(color, (res) => {
//     console.log(res,'load')
// }, () => {
//     console.log(res,'progress')
// }, () => {
//     console.log('error', res)
// })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
// add texture to material w/ map
const material = new THREE.MeshBasicMaterial({ map: diamond })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
camera.position.z = 1
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()