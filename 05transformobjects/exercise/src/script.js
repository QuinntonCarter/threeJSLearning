import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// ** with group **
const group = new THREE.Group()
group.position.y = 1
// add group to scene
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'cyan'})
)
cube1.position.x = 2
// add to group
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'cyan'})
)
cube2.position.x = -1
// add to group
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'cyan'})
)
cube2.position.x = -2
// add to group
group.add(cube3)


// ** without group **
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 'cyan' })
// const mesh = new THREE.Mesh(geometry, material)

// // position of Mesh
// // mesh.position.x = 0.7
// // mesh.position.y = - 0.6
// // mesh.position.z = 1
// // or
// mesh.position.set(0.7, - 0.6, 1)

// // scale Mesh
// // mesh.scale.x = 2
// // mesh.scale.y = 0.5
// // mesh.scale.z = 0.5
// // or
// mesh.scale.set(2, 0.5, 0.5)

// // rotation Mesh
// mesh.rotation.reorder('XYZ')
// // mesh.rotation.x = 3
// // mesh.rotation.y = 2
// // mesh.rotation.z = 1
// mesh.rotation.set(3, 2, 1)

// scene.add(mesh)

// AXES helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)
camera.position.z = 3

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)