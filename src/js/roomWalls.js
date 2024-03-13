import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import React from 'react';
import { useEffect, useRef } from "react";
import floorImage from "../../src/img/floorImage.jpg";
function RoomWalls() {
  const refContainer = useRef(null);
  
  useEffect(() => {
   // Question Reference: discourse.threejs.org/t/clip-exceeding-parts-of-object-groups/19692

let camera, scene, renderer, controls, mesh;

const createWorld = () => {
  const houseGroup = new THREE.Group();
  const house = new THREE.Object3D();

  houseGroup.add(house);
  scene.add(houseGroup);
  
  // Draw front and back walls (with angled edges)
  const tiltWallShape = new THREE.Shape();
  tiltWallShape.moveTo(0,0);
  tiltWallShape.lineTo(10, 0);
  tiltWallShape.lineTo(10, 5);
  tiltWallShape.lineTo(0, 5);
  tiltWallShape.lineTo(0, 0);
  const tiltWallGeometry = new THREE.ExtrudeGeometry([ tiltWallShape ], {
    steps: 1,
    depth: .2,
    bevelEnabled: false,
    curveSegments: 32
  });
  const tiltWallA = new THREE.Mesh(tiltWallGeometry, new THREE.MeshStandardMaterial({ color: 0xdddddd}));
  tiltWallA.translateX(-5);
  tiltWallA.translateZ(-4);
  house.add(tiltWallA);
  
  const tiltWallB = tiltWallA.clone();
  tiltWallB.translateZ(.2);
  tiltWallB.rotateY(Math.PI);
 // house.add(tiltWallB);
  
  const tiltWallC = tiltWallA.clone();
  tiltWallC.translateZ(1.2);
  //house.add(tiltWallC);

  const tiltWallD = tiltWallA.clone();
  tiltWallD.translateZ(1.4);
  tiltWallD.rotateY(Math.PI);
  //house.add(tiltWallD);
  
  // Draw side walls
  const wallShape = new THREE.Shape();
  wallShape.moveTo(0, 0);
  wallShape.lineTo(10, 0);
  wallShape.lineTo(10, 5);
  wallShape.lineTo(0, 5);
  wallShape.lineTo(0, 0);
  const wallGeometry = new THREE.ExtrudeGeometry([ wallShape ], {
    steps: 1,
    depth: .2,
    bevelEnabled: false,
    curveSegments: 32
  });
  const wallA = new THREE.Mesh(wallGeometry, new THREE.MeshStandardMaterial({ color: 0xdddddd }));
  wallA.rotateY(-Math.PI / 2);
  wallA.translateX(-4);
  wallA.translateZ(-3.2);
 // house.add(wallA);
  
  const wallB = wallA.clone();
  wallB.translateZ(-1.8);
  house.add(wallB);
  
  // Draw roof
  const roofShape = new THREE.Shape();
  roofShape.moveTo(-0.2, 0);
  roofShape.lineTo(1.6, 0);
  roofShape.lineTo(1.6, 1.2);
  roofShape.lineTo(-0.2, 1.2);
  roofShape.lineTo(-0.2, 0);
  const roofGeometry = new THREE.ExtrudeGeometry([ roofShape ], {
    steps: 1,
    depth: .2,
    bevelEnabled: false,
    curveSegments: 32
  });
  const roofA = new THREE.Mesh(roofGeometry, new THREE.MeshStandardMaterial({ color: 0x9999ff }));
  roofA.rotateY(-Math.PI / 2);
  roofA.rotateX(-Math.PI / 2 - 0.25);
  roofA.translateZ(1);
  roofA.translateY(-0.4);
 // house.add(roofA);
  
  const roofB = roofA.clone();
  roofB.rotateZ(Math.PI);
  roofB.rotateX(-0.5);
  roofB.translateY(-0.2);
  roofB.translateZ(-0.05);
  roofB.translateX(-1.4);
 // house.add(roofB);


 const texture = new THREE.TextureLoader().load(floorImage);
 
  
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ map:texture  }));
  ground.rotateX(-Math.PI / 2);
  ground.translateX(-0.5);
  ground.translateY(-0.5);
  houseGroup.add(ground);
  
  house.translateX(-0.5);
  house.translateZ(-0.5);
  
  house.traverse(mesh => (mesh !== house ? mesh.visible = false : null));

  mesh = [houseGroup,house];
  
  camera.lookAt(houseGroup.position);
  
  let step = 0;
  let animateSteps = setInterval(() => {
   step =  (step + 1) % (house.children.length + 1);
   house.children.forEach((mesh, index) => mesh.visible = index < step);
   if(step === 2){
    clearInterval(animateSteps);
   }
  }, 1000);

};

const init = () => {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000.0);
  camera.position.set(-5, 5, 7);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x333333);

  scene.add(new THREE.HemisphereLight(0xffffcc, 0x19bbdc, 1));

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Append the renderer to the document body
  document.getElementById("walls-container").appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  
  createWorld();
}

const animate = () => {
  requestAnimationFrame(animate);
  
  controls.update();

  renderer.render(scene, camera); 
  
 //  mesh[0].rotateY(.01);
}

init();
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

export default RoomWalls;