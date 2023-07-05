import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

import alphaTex from '../static/textures/door/alpha.jpg'
import ambientOcclusionTex from '../static/textures/door/ambientOcclusion.jpg'
import colorTex from '../static/textures/door/color.jpg'
import heightTex from '../static/textures/door/height.jpg'
import metalnessTex from '../static/textures/door/metalness.jpg'
import normalTex from '../static/textures/door/normal.jpg'
import roughnessTex from '../static/textures/door/roughness.jpg'
import matCapTex from '../static/textures/matcaps/3.png'
import gradientTex from '../static/textures/gradients/5.jpg'

// debug controls 
const gui = new GUI()

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
const cubeTextureLoader = new THREE.CubeTextureLoader()

const alphaTexture = textureLoader.load(alphaTex)
const heightTexture = textureLoader.load(heightTex)
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionTex)
const normalTexture = textureLoader.load(normalTex)
const metalnessTexture = textureLoader.load(metalnessTex)
const roughnessTexture = textureLoader.load(roughnessTex)
const colorTexture = textureLoader.load(colorTex)
const matCapTexture = textureLoader.load(matCapTex)
const gradientTexture = textureLoader.load(gradientTex)
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

// objects/examples
// const material = new THREE.MeshBasicMaterial({ map: matCapTexture })
// const material = new THREE.MeshBasicMaterial()
// OR w no argument
// material.map = colorTexture
// OR FOR COLORS
// material.color.set('lime')
// OR more complicated
// material.wireframe = true
// material.color = new THREE.Color('#0f0')
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = alphaTexture
// material.side = THREE.DoubleSide

// Technically used for debugging but also looks sicc af for design lol
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// example matcapmaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matCapTexture

// lamber example
// const material = new THREE.MeshLambertMaterial()
// phong example
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color('red')
// toon mesh example
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture
// standard material
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0
// material.roughness = 1
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.displacementMap = heightTexture
// material.displacementScale = 0.0
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalScale.set(0.5,0.5)
// material.normalMap = normalTexture
// // need both to mess with alphamap *
// material.transparent = true
// material.alphaMap = alphaTexture
// // * 

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture

// outlines
material.aoMapIntensity = 0

// DEBUG controls
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(10).step(0.0001)
// gui.add(material, 'normalScale').min(0).max(10).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

sphere.position.x = -1.5
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
console.log(plane.geometry)
                        // need uv2 for mapping,
plane.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
torus.position.x = 1.5

scene.add(sphere, plane, torus)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

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