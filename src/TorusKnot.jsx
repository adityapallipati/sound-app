import * as dat from "dat.gui";
import { useEffect } from "react";
import * as THREE from "three-old";
import SimplexNoise from "simplex-noise";


function TorusKnot() {
  useEffect(() => {
    //initialise simplex noise instance
    var noise = new SimplexNoise();

    // the main visualiser function
    var vizInit = function () {
      var file = document.getElementById("selection");
      var audio = document.getElementById("player");
      var fileLabel = document.querySelector("label.file"); 

      document.onload = function (e) {
        console.log(e);
        audio.play();
        play();
      };

      file.onchange = function (e) {
        fileLabel.classList.add("normal");
        audio.classList.add("active");
        audio.src = e.target.value;
        audio.load();
        audio.play();
        play();
      };

      function play() {
        var context = new AudioContext();
        var src = context.createMediaElementSource(audio);
        var analyser = context.createAnalyser();
        src.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 512;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        //here comes the webgl
        var scene = new THREE.Scene();
        var group = new THREE.Group();
        var camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.set(0, 0, 150);
        camera.lookAt(scene.position);
        scene.add(camera);

        var renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const torusGeometry = new THREE.TorusKnotGeometry(10.659, 4.6431, 300, 20, 20, 3)
        const basicMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xFFFF00,
          wireframe: true
        });

        var ball = new THREE.Mesh(torusGeometry, basicMaterial);
        ball.position.set(0, 0, 0);
        group.add(ball);

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

        

  


        //var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
        //orbitControls.autoRotate = true;

        scene.add(group);

        document.getElementById("out").appendChild(renderer.domElement);

        window.addEventListener("resize", onWindowResize, false);

        render();

        function render() {
          analyser.getByteFrequencyData(dataArray);

          var lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1);
          var upperHalfArray = dataArray.slice(
            dataArray.length / 2 - 1,
            dataArray.length - 1
          );

          var overallAvg = avg(dataArray);
          var lowerMax = max(lowerHalfArray);
          var lowerAvg = avg(lowerHalfArray);
          var upperMax = max(upperHalfArray);
          var upperAvg = avg(upperHalfArray);

          var lowerMaxFr = lowerMax / lowerHalfArray.length;
          var lowerAvgFr = lowerAvg / lowerHalfArray.length;
          var upperMaxFr = upperMax / upperHalfArray.length;
          var upperAvgFr = upperAvg / upperHalfArray.length;

          makeRoughBall(
            ball,
            modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
            modulate(upperAvgFr, 0, 1, 0, 4)
          );

          group.rotation.y += 0.005;

          renderer.render(scene, camera);
          requestAnimationFrame(render);
        }

        function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function makeRoughBall(mesh, bassFr, treFr) {
        
          mesh.geometry.vertices.forEach(function (vertex, i) {
            var offset = mesh.geometry.parameters.radius;
            var amp = 7;
            var time = window.performance.now();
            vertex.normalize();
            var rf = 0.00001;
            var distance =
              offset +
              bassFr +
              noise.noise3D(
                vertex.x + time * rf * 7,
                vertex.y + time * rf * 8,
                vertex.z + time * rf * 9
              ) *
                amp *
                treFr;
            vertex.multiplyScalar(distance);
          });
          mesh.geometry.verticesNeedUpdate = true;
          mesh.geometry.normalsNeedUpdate = true;
          mesh.geometry.computeVertexNormals();
          mesh.geometry.computeFaceNormals();
        }

        var geometry = new THREE.Geometry().fromBufferGeometry( bufferGeometry );
        function makeRoughGround(mesh, distortionFr) {
          mesh.geometry.vertices.forEach(function (vertex, i) {
            var amp = 2;
            var time = Date.now();
            var distance =
              (noise.noise2D(
                vertex.x + time * 0.0003,
                vertex.y + time * 0.0001
              ) +
                0) *
              distortionFr *
              amp;
            vertex.z = distance;
          });
          mesh.geometry.verticesNeedUpdate = true;
          mesh.geometry.normalsNeedUpdate = true;
          mesh.geometry.computeVertexNormals();
          mesh.geometry.computeFaceNormals();
        }

        audio.play();
      }
    };

    window.onload = vizInit();

    document.body.addEventListener("touchend", function (ev) {
      context.resume();
    });

    //some helper functions here
    function fractionate(val, minVal, maxVal) {
      return (val - minVal) / (maxVal - minVal);
    }

    function modulate(val, minVal, maxVal, outMin, outMax) {
      var fr = fractionate(val, minVal, maxVal);
      var delta = outMax - outMin;
      return outMin + fr * delta;
    }

    function avg(arr) {
      var total = arr.reduce(function (sum, b) {
        return sum + b;
      });
      return total / arr.length;
    }

    function max(arr) {
      return arr.reduce(function (a, b) {
        return Math.max(a, b);
      });
    }
  }, []);

  return (
    <div>
      <div className="dropdown">
        <button className="dropbtn">+</button>
        <div className="dropdown-content">
        <a href="/">HOME</a>
          <a href="/sounds">SOUNDS</a>
          <a href="/about">ABOUT</a>
        </div>
      </div>
      <div id="content">
        <label htmlFor="selection" className="file"></label>

        <select  className="bg-transparent text-white my-3 text-center mx-3" id="selection">
          <option value="">SELECT A SOUND</option>
          <option value="src/sounds/1.mp3">SOUND ONE</option>
          <option value="src/sounds/2.mp3">SOUND TWO</option>
        </select>

        <audio id="player" src="" controls="controls">
          Your browser does not support the audio element.
        </audio>
       <div id="out"></div>

      </div>

      

    </div>
  );
}

export default TorusKnot;
