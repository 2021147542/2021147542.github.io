// 05-both-cameras.js
// - PerspectiveCamera vs OrthographicCamera
// - OrbitControl change when camera changes

import * as THREE from 'three';  
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

// Camera를 perspective와 orthographic 두 가지로 switching 해야 해서 const가 아닌 let으로 선언
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 30;
camera.position.z = 150;
camera.lookAt(scene.position);
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const stats = new Stats();
document.body.appendChild(stats.dom);

// Camera가 바뀔 때 orbitControls도 바뀌어야 해서 let으로 선언
let orbitControls = new OrbitControls(camera, renderer.domElement);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(5, 12, 8); // 여기서 부터 (0, 0, 0) 방향으로 light ray 방향
dirLight.castShadow = true;  // 이 light가 shadow를 만들어 낼 것임
scene.add(dirLight);

let step = 0.01;
const PI = Math.PI;
let mercuryRotAngle = 0;
let venusRotAngle = 0;
let earthRotAngle = 0;
let marsRotAngle = 0;
let mercuryOrbitAngle = 0;
let venusOrbitAngle = 0;
let earthOrbitAngle = 0;
let marsOrbitAngle = 0;
// GUI
const gui = new GUI();
const controls = new function () {
    this.perspective = "Perspective";
    this.switchCamera = function () {
        if (camera instanceof THREE.PerspectiveCamera) {
            scene.remove(camera);
            camera = null; // 기존의 camera 제거    
            // OrthographicCamera(left, right, top, bottom, near, far)
            camera = new THREE.OrthographicCamera(window.innerWidth / -16, 
                window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
            camera.position.x = 120;
            camera.position.y = 60;
            camera.position.z = 180;
            camera.lookAt(scene.position);
            orbitControls.dispose(); // 기존의 orbitControls 제거
            orbitControls = null;
            orbitControls = new OrbitControls(camera, renderer.domElement);
            orbitControls.enableDamping = true;
            this.perspective = "Orthographic";
        } else {
            scene.remove(camera);
            camera = null; 
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.x = 120;
            camera.position.y = 60;
            camera.position.z = 180;
            camera.lookAt(scene.position);
            orbitControls.dispose(); // 기존의 orbitControls 제거
            orbitControls = null;
            orbitControls = new OrbitControls(camera, renderer.domElement);
            orbitControls.enableDamping = true;
            this.perspective = "Perspective";
        }
    };
};
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(controls, 'switchCamera');
cameraFolder.add(controls, 'perspective').listen();
const Mercury = {
    Rotationspeed: 0.02,
    Orbitspeed: 0.02
};
const mercuryFolder = gui.addFolder('Mercury');
mercuryFolder.add(Mercury, 'Rotationspeed', 0, 0.1, 0.001).name('Rotation Speed');
mercuryFolder.add(Mercury, 'Orbitspeed', 0, 0.1, 0.001).name('Orbit Speed');

const Venus = {
    Rotationspeed: 0.015,
    Orbitspeed: 0.015
};
const venusFolder = gui.addFolder('Venus');
venusFolder.add(Venus, 'Rotationspeed', 0, 0.1, 0.001).name('Rotation Speed');
venusFolder.add(Venus, 'Orbitspeed', 0, 0.1, 0.001).name('Orbit Speed');

const Earth = {
    Rotationspeed: 0.01,
    Orbitspeed: 0.01
};
const earthFolder = gui.addFolder('Earth');
earthFolder.add(Earth, 'Rotationspeed', 0, 0.1, 0.001).name('Rotation Speed');
earthFolder.add(Earth, 'Orbitspeed', 0, 0.1, 0.001).name('Orbit Speed');

const Mars = {
    Rotationspeed: 0.008,
    Orbitspeed: 0.008
};
const marsFolder = gui.addFolder('Mars');
marsFolder.add(Mars, 'Rotationspeed', 0, 0.1, 0.001).name('Rotation Speed');
marsFolder.add(Mars, 'Orbitspeed', 0, 0.1, 0.001).name('Orbit Speed');


//const clock = new THREE.Clock();
//각 행성 부분
//태양
const sunGeometry = new THREE.SphereGeometry(10);
const sunMaterial = new THREE.MeshLambertMaterial({
    //map: textureLoader.load("Mars.jpg"),
    color: 0xffff00
    // metalness: 0.2,
    // roughness: 0.8
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

//수성
const mercuryGeometry = new THREE.SphereGeometry(1.5);
const mercuryMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("Mercury.jpg"),
    metalness: 0.2,
    roughness: 0.8
});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.set(20,0,0);
scene.add(mercury);

//금성

const venusGeometry = new THREE.SphereGeometry(3);
const venusMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("Venus.jpg"),
    metalness: 0.2,
    roughness: 0.8
});
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(35,0,0);
scene.add(venus);

//지구
const earthGeometry = new THREE.SphereGeometry(3.5);
const earthMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("Earth.jpg"),
    metalness: 0.2,
    roughness: 0.8
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(50,0,0);
scene.add(earth);
//화성
const marsGeometry = new THREE.SphereGeometry(2.5);
const marsMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load("Mars.jpg"),
    metalness: 0.2,
    roughness: 0.8
});
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.set(65,0,0);
scene.add(mars);


render();

function render() {
    orbitControls.update();
    stats.update();
    mercuryRotAngle += Mercury.Rotationspeed * step * 360 / PI;
    mercuryOrbitAngle += Mercury.Orbitspeed * step * 360 / PI;
    venusRotAngle += Venus.Rotationspeed * step * 360 / PI;
    venusOrbitAngle += Venus.Orbitspeed * step * 360 / PI;
    earthRotAngle += Earth.Rotationspeed * step * 360 / PI;
    earthOrbitAngle += Earth.Orbitspeed * step * 360 / PI;
    marsRotAngle += Mars.Rotationspeed * step * 360 / PI;
    marsOrbitAngle += Mars.Orbitspeed * step * 360 / PI;
    
    //수성
    mercury.rotation.y = mercuryRotAngle;
    mercury.position.x = 20 * Math.cos(mercuryOrbitAngle);
    mercury.position.z = -20 * Math.sin(mercuryOrbitAngle);
    //금성
    venus.rotation.y = venusRotAngle;
    venus.position.x = 35 * Math.cos(venusOrbitAngle);
    venus.position.z = -35 * Math.sin(venusOrbitAngle);
    //지구
    earth.rotation.y = earthRotAngle;
    earth.position.x = 50 * Math.cos(earthOrbitAngle);
    earth.position.z = -50 * Math.sin(earthOrbitAngle);
    //화성
    mars.rotation.y = marsRotAngle;
    mars.position.x = 65 * Math.cos(marsOrbitAngle);
    mars.position.z = -65 * Math.sin(marsOrbitAngle);
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
