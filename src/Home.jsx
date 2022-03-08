import * as dat from "dat.gui";
import { useEffect } from "react";
import * as THREE from "three";



function Home() {
  useEffect(() => {


    const texture = new THREE.TextureLoader();
    const scene = new THREE.Scene();
    const group = new THREE.Group();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;

    const canvas = document.getElementById("myThreeJsCanvas");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);



    // lights

    const ambientLight = new THREE.AmbientLight(0xaaaaaa, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(-10, 40, 20);
    scene.add(spotLight);

    const light = new THREE.SpotLight(0xffffff, .9);
    light.castShadow = true;
    light.lookAt(scene);
    light.position.set(-40, -1000, 200);
    scene.add(light);


    // textures

  

    // geometry and materials

    const icosahedronGeometry = new THREE.IcosahedronGeometry(18, 20);
    const lambertMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true
    });

    const dodecahedronGeometry = new THREE.DodecahedronGeometry(18, 0);
    const phongMaterial = new THREE.MeshStandardMaterial({
      color: 0x800000,
      wireframe: false
    
    });
    
    const torusGeometry = new THREE.TorusKnotGeometry(10.659, 4.6431, 300, 20, 20, 3)
    const basicMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xFFFF00,
      wireframe: true
    });

    const octoGeometry = new THREE.OctahedronGeometry(20, 2);
    const octoMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0000FF,
      wireframe: false
    })
    

    // sphere objects

    const ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);

    ball.position.set(0, 18, 0);
    group.add(ball);

   
    const ball2 = new THREE.Mesh(dodecahedronGeometry, phongMaterial);

    ball2.position.y = -23;
    group.add(ball2);

    const ball3 = new THREE.Mesh(torusGeometry, basicMaterial);

    ball3.position.y = -66;
    group.add(ball3);


    const ball4 = new THREE.Mesh(octoGeometry, octoMaterial);

    ball4.position.y = -112;
    group.add(ball4);



    // final group

    scene.add(group);

    // resize function

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // hyperlink


    // mouse 

     window.addEventListener("wheel", onMouseWheel)

     let y = 0
     let position = 0
 
     function onMouseWheel(event){
       y = event.deltaY * 0.007;
     }
 

    //tick

    const clock = new THREE.Clock();

    // animation and render

    const animate = () => {

      const elapsedTime = clock.getElapsedTime();


      // camera update
      position -= y;
      y *= .5;
      camera.position.y = position;

      //fix this too jumpy
     
    

      // animations 

      ball.rotation.x += 0.001;
      ball.rotation.y += 0.001;

      ball2.rotation.x += 0.01;
      ball2.rotation.y += 0.01;

      ball3.rotation.x += 0.01;
      ball3.rotation.y += 0.004;

      ball4.rotation.x += 0.009;


    
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    
  }, []);

  return (
    <div>
      
      <canvas id="myThreeJsCanvas" />
      <div className="dropdown">
        <button className="dropbtn">+</button>
        <div className="dropdown-content">
          <a href="/">HOME</a>
          <a href="/sounds">SOUNDS</a>
          <a href="/about">ABOUT</a>
          
        </div>
      </div>
<div id="logo"><h1>SD-S</h1></div>
    <footer id="footer">
      <a href="/wireframe"> WIREFRAME </a> <br></br>
      <a href="/isohedron">  ISOHEDRON </a> <br></br>
      <a href="/torusknot"> TORUS-KNOT </a> <br></br>
      <a href="/octohedron"> OCTOHEDRON </a> <br></br>
    </footer>

    <div id="footer-container">

    <a className="mx-1" href="/wireframe"> WIREFRAME </a> 
    <a href="/isohedron">  ISOHEDRON </a> 
    <a href="/torusknot"> TORUS-KNOT </a>
    <a href="/octohedron"> OCTOHEDRON </a> 

    </div>
    </div>

  );
}

export default Home;
