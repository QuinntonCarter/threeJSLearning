import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')

/**
 * Particles Demo
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry(1, 32, 32);
const count = 50000

// * 3 to represent xyz values
const positions = new Float32Array(count * 3)
// * 3 to represent rgb values
const colors = new Float32Array(count * 3)
for(let i= 0; i < count * 3; i++){
    positions[i] = (Math.random() - 0.5) * 10; 
    colors[i] = Math.random()
}

particlesGeometry.setAttribute(
    'position',
    // 3 to represent xyz values
    new THREE.BufferAttribute(positions, 3)
    )

particlesGeometry.setAttribute(
    'color',
    // 3 to represent xyz values
    new THREE.BufferAttribute(colors, 3)
    )

// Material
const particlesMaterial = new THREE.PointsMaterial({
    // particle size
    size: 0.029,
    // color: 'white',
    // close to big, far from camera small
    sizeAttenuation: true,
    // to make transparent
    transparent: true,
    alphaMap: particleTexture,
    // alphaTest: 0.001,
    // prevents webGL from determining depth of particles; causes
    // visibility of particles through objects
    // depthTest: false
    depthWrite: false,
    // blends colors when pixels intersect
    blending: THREE.AdditiveBlending,
    // allows particles to be multicolored
    vertexColors: true
});

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// CUBE for particle display testing
const cube = new THREE.Mesh(
    new THREE.BoxGeometry,
    new THREE.MeshBasicMaterial({color: 'purple'})
);
scene.add(cube)

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
camera.position.z = 3
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

    // Update particles
    // particles.rotation.y = elapsedTime
    // for moving particles; array representing x y z positions
    for(let i = 0; i < count; i++){
        // gets value individually * 3
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]

        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }
    particlesGeometry.attributes.position.needsUpdate = true
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()