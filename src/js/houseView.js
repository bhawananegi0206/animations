import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import React from 'react';
import { useEffect, useRef } from "react";
import emptyHouse from "../../src/img/emptyhouse.jpg";

function HouseView() {
  const refContainer = useRef(null);
  if(document.getElementById('chair') !== null)  {
    document.getElementById('chair').remove();
  } 
  else if(document.getElementById('cube') !== null) {
    document.getElementById('cube').remove();
  } 
  else if(document.getElementById('roomWalls') !== null) {
    document.getElementById('roomWalls').remove();
  }
  useEffect(() => {
    let camera, scene, renderer, controls;
    var animate = function () {
      // Create a new camera object
    var myContainerElement = document.getElementById("panorama-container");
    camera = new THREE.PerspectiveCamera(75,myContainerElement.clientWidth/myContainerElement.clientHeight, .1, 1000);

    // Set the camera position
    camera.position.set(0,2.5, 2.5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    // Create a new scene object
    scene = new THREE.Scene();

    // Load the panorama image
    const loader = new THREE.TextureLoader();
    const texture = loader.load(emptyHouse);

    // Set the texture wrapping and flipping options
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;

    // Create a new sphere geometry to hold the panorama image
    const geometry = new THREE.SphereGeometry(500, 60, 30);

    // Flip the geometry inside out so that the image is displayed on the inside of the sphere
    geometry.scale(-1, 1, 1);

    // Create a new material with the loaded texture
    const material = new THREE.MeshBasicMaterial({
        map: texture
    });

    // Create a new mesh with the geometry and material
    const mesh = new THREE.Mesh(geometry, material);

    // Add the mesh to the scene
    scene.add(mesh);

    // Create a new WebGL renderer object
    renderer = new THREE.WebGLRenderer();

    // Set the renderer size to the window size
    renderer.setSize(myContainerElement.clientWidth, myContainerElement.clientHeight);

    // Append the renderer to the document body
    document.getElementById("panorama-container").appendChild(renderer.domElement);

    // Create a new OrbitControls object to enable mouse drag controls
    controls = new OrbitControls(camera, renderer.domElement);

    // Disable vertical movement of the camera
    controls.enableZoom = false;
    controls.enablePan = false;

    // Set the controls to rotate around the panorama image
    controls.rotateSpeed = -0.25;

    // Set the render loop
    renderer.setAnimationLoop(() => {
        // Update the OrbitControls
        controls.update();

        // Render the scene with the camera and renderer
        renderer.render(scene, camera);
    });
    };
    animate();
    // Resize the renderer when the window size changes
       // window.addEventListener('resize', () => {
         //   camera.aspect = window.innerWidth / window.innerHeight;
           // camera.updateProjectionMatrix();
           // renderer.setSize(window.innerWidth, window.innerHeight);
        //});
  }, []);
  return (
    <div ref={refContainer}></div>

  );
}

export default HouseView