import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import React from 'react';
import { useEffect, useRef } from "react";
import floorImage from "../src/img/floorImage.jpg";


function FuritureView() {
  const refContainer = useRef(null);
  
  useEffect(() => {
   // Question Reference: discourse.threejs.org/t/clip-exceeding-parts-of-object-groups/19692

let camera, scene, renderer, controls, mesh, group;
let enableSelection = false;
const mouse = new THREE.Vector2(), raycaster = new THREE.Raycaster();
const objects = [];
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
  const wallB = wallA.clone();
  wallB.translateZ(-1.8);
  house.add(wallB);




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


const render = () => {

    renderer.render( scene, camera );

}

const moveOnClick = (event) => {

    event.preventDefault();

    if ( enableSelection === true ) {
console.log('hello');
        const draggableObjects = controls.getObjects();
        draggableObjects.length = 0;

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, camera );

        const intersections = raycaster.intersectObjects( objects, true );

        if ( intersections.length > 0 ) {

            const object = intersections[ 0 ].object;

            if ( group.children.includes( object ) === true ) {

                object.material.emissive.set( 0x000000 );
                scene.attach( object );

            } else {

                object.material.emissive.set( 0xaaaaaa );
                group.attach( object );

            }

            controls.transformGroup = true;
            draggableObjects.push( group );

        }

        if ( group.children.length === 0 ) {

            controls.transformGroup = false;
            draggableObjects.push( ...objects );

        }

    }

    render();

}

const init = () => {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000.0);
  camera.position.set(-5, 5, 7);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x333333);

  scene.add(new THREE.HemisphereLight(0xffffcc, 0x19bbdc, 1));

  const geometry = new THREE.BoxGeometry( 5,5,5,2,2,2 ); 
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
  const cube = new THREE.Mesh( geometry, material ); 
  cube.addEventListener( 'click', moveOnClick );
  scene.add( cube );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  
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

export default FuritureView;