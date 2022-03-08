import * as dat from "dat.gui";
import { useEffect } from "react";
import * as THREE from "three";
import React, { useRef, useState } from "react";



function Sounds() {
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

 <div id="audio-playlist">
   <audio src="src/sounds/1.mp3" controls autoplay="false"></audio>
 </div>
    </div>
  );
}

export default Sounds;
