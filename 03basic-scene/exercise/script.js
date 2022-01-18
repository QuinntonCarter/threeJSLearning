// need for render location - querySelector returns individual element
const canvas = document.querySelector('.threeCanvas');
// like container, where objets, camera, render happens
const scene = new THREE.Scene();

// cube                              size params x, y, z
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// doesn't have to be string for color attribute
const material = new THREE.MeshBasicMaterial({ color: 'cyan' });
const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh)

// size of aspect ratio
const sizes = {
    width: 800,
    height: 600
};

// camera                       params: fov (field of view), aspect ratio
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// scene.add(camera)
// Renderer
const renderer = new THREE.WebGLRenderer({
    // must provide canvas
    canvas: canvas
});
// can also add multiple params, add() accepts "arbitrary" # of args
scene.add(mesh, camera)

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)