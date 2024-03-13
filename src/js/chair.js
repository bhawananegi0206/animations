import * as THREE from 'three';
import React from 'react';
import { useEffect, useRef } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { GUI } from 'dat.gui';


			
function MoveChair() {
  const refContainer = useRef(null);
  
  useEffect(() => {
    let camera, scene, renderer, controls;

    init();
    animate();

    function init() {
        const container = document.createElement( 'div' );
  // Append the renderer to the document body
       document.getElementById("chair-container").appendChild(container);
    
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20 );
        camera.position.set( - 0.75, 0.7, 1.25 );

        scene = new THREE.Scene();

        // model

        new GLTFLoader()
            .load('SheenChair.glb', function ( gltf ) {

                scene.add( gltf.scene );

                const object = gltf.scene.getObjectByName( 'SheenChair_fabric' );

                const gui = new GUI();

                gui.add( object.material, 'sheen', 0, 1 );
                gui.open();

            } );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        container.appendChild( renderer.domElement );

        const environment = new RoomEnvironment( renderer );
        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        scene.background = new THREE.Color( 0xbbbbbb );
        scene.environment = pmremGenerator.fromScene( environment ).texture;

        controls = new OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controls.target.set( 0, 0.35, 0 );
       controls.update();

        window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }


    function animate() {

        requestAnimationFrame( animate );

       // controls.update(); // required if damping enabled

        render();

    }

    function render() {

        renderer.render( scene, camera );

    }

  }, []);
  return (
    <div ref={refContainer}></div>

  );
}

export default MoveChair;