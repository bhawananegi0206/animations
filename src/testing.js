import * as THREE from 'three';

import { DragControls } from 'three/addons/controls/DragControls.js';

let container;
let camera, scene, renderer;
let controls, group;
let enableSelection = false;

const objects = [];

const mouse = new THREE.Vector2(), raycaster = new THREE.Raycaster();

init();


