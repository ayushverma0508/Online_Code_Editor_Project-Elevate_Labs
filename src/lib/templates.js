export const TEMPLATE_OPTIONS = [
    { id: 'blank', label: 'Blank' },
    { id: 'starter', label: 'Starter DOM' },
    { id: 'bootstrap', label: 'Bootstrap CDN' },
    { id: 'three', label: 'Three.js Cube' }
]

export function getTemplate(id = 'blank') {
    switch (id) {
        case 'starter':
            return {
                title: 'Starter DOM',
                html: `<h1>Hello 👋</h1>
<button id="btn">Click me</button>
<pre id="out" style="white-space:pre-wrap"></pre>`,
                css: `body{font-family:system-ui;padding:20px}`,
                js: `document.getElementById('btn').addEventListener('click', ()=> {
  const o = document.getElementById('out');
  const now = new Date().toLocaleTimeString();
  o.textContent = 'Clicked at ' + now;
  console.log('button clicked', now);
});`
            }
        case 'bootstrap':
            return {
                title: 'Bootstrap Starter',
                html: `<!doctype html>
<html><head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head><body class="p-4">
<div class="container">
  <h1 class="mb-3">Bootstrap</h1>
  <button id="btn" class="btn btn-primary">Click me</button>
  <div id="out" class="mt-3"></div>
</div>
</body></html>`,
                css: ``,
                js: `document.getElementById('btn').addEventListener('click', ()=> {
  document.getElementById('out').textContent = 'Hello from Bootstrap';
});`
            }
        case 'three':
            return {
                title: 'Three.js Cube',
                html: `<!doctype html>
<html><head>
<script src="https://unpkg.com/three@0.164.1/build/three.min.js"></script>
<style>body{margin:0}</style>
</head><body></body></html>`,
                css: ``,
                js: `const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 3;
addEventListener('resize', ()=> {
  camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight);
});
(function anim(){ requestAnimationFrame(anim); cube.rotation.x += 0.01; cube.rotation.y += 0.01; renderer.render(scene,camera); })();`
            }
        case 'blank':
        default:
            return {
                title: 'Blank',
                html: `<h1>Hello world</h1>`,
                css: `/* your css */`,
                js: `// your js`
            }
    }
}