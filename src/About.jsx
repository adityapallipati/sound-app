import * as dat from "dat.gui";
import { useEffect } from "react";
import * as THREE from "three";



function About() {
  useEffect(() => {



    
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
      <h1 className="text-center">EDIT THIS PAGE LATER</h1>

     
    </div>
  );
}

export default About;
