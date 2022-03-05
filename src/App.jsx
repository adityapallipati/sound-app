import { useEffect } from 'react';
import { GUI } from 'dat.gui';
import * as THREE from 'three';
import * as dat from 'dat.gui';



function App() {
  useEffect(() => {

    const gui = new dat.GUI();

    const texture = new THREE.TextureLoader();
    
    const scene = new THREE.Scene();
    const group = new THREE.Group();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth/window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;

    gui.add(camera.position,'y').min(-200).max(0);
  

    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false
    });

    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xaaaaaa, .5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(-10, 40, 20);
    scene.add(spotLight);
    
   const icosahedronGeometry = new THREE.IcosahedronGeometry(18, 20);
   const lambertMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    wireframe: true
});

const ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);

ball.position.set(0, 18, 0);
group.add(ball);

  


const ball2 = new THREE.Mesh(icosahedronGeometry, lambertMaterial);

ball2.position.y = -23;
group.add(ball2);

const ball3 = new THREE.Mesh(icosahedronGeometry, lambertMaterial);

ball3.position.y = -66;
group.add(ball3);

const ball4 = new THREE.Mesh(icosahedronGeometry, lambertMaterial);

ball4.position.y = -112;
group.add(ball4);

scene.add(group);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
    const animate = () => {

      ball.rotation.x += .001;
      ball.rotation.y += .001;

      ball2.rotation.x += .003;
      ball2.rotation.y += .0001;

      ball3.rotation.x += .01;
      ball3.rotation.y += .004;

      ball4.rotation.x += .001;
    

      renderer.render(scene,camera);
      window.requestAnimationFrame(animate);
    };
    animate();

  }, []);

  return (
    
    <div>
      <canvas id="myThreeJsCanvas" />
      <div class="dropdown">
            <button class="dropbtn">+</button>
            <div class="dropdown-content">
              <a href="#">SOUNDS</a>
              <a href="#">HOME</a>
              <a href="#">ABOUT</a>
            </div>
      </div>

      <a href=""><div id="wireframe"></div></a>
          
    </div>
  );
}

export default App;