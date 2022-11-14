var ironman = new THREE.TextureLoader().load("textures/ironman.jpg");
var captain = new THREE.TextureLoader().load("textures/captain.jpg");
var hulk = new THREE.TextureLoader().load("textures/hulk.jpg");
var batman = new THREE.TextureLoader().load("textures/batman.jpg");
var joker = new THREE.TextureLoader().load("textures/joker.jpg");
var deadpool = new THREE.TextureLoader().load("textures/deadpool.jpg");
var mainTex = new THREE.TextureLoader().load(
    "textures/marveldc.jpg"
);
  
var silver = new THREE.TextureLoader().load("textures/silver.png");
var sc = new THREE.TextureLoader().load("textures/sss.png");
var cpu2 = new THREE.TextureLoader().load("textures/cpu2.jpg");
var cpu1 = new THREE.TextureLoader().load("textures/cpu1.jpg");

var scene, camera, renderer, flr;

var ambientLight, light;

var keyboard = {};
var degree = 0;
var click = 1;

//////////////////////////////////////////////camera position
var eye = {     
    height: 0.5,
    speed: 0.01
}


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//////////////////////////////////////////////response
const canv = document.querySelector("#start");

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.render(scene, camera); 
});

//////////////////////////////////////////////initialize
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    90,
    sizes.width / sizes.height,
    0.1,
    1000
  );

  
  //////////////////////////////////////////////wrapper
  mainTex.wrapS = THREE.RepeatWrapping;
  mainTex.wrapT = THREE.RepeatWrapping;
  mainTex.repeat.set(1, 1);
 




  //////////////////////////////////////////////
    stand = new THREE.Mesh(
        new THREE.BoxGeometry(0.72, 0.5, 0.1),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: silver
        })
    );
    scene.add(stand);
    stand.position.set(0, 0, 0.0);
    stand.rotation.x -= Math.PI / 2;
    stand.receiveShadow = true;
    stand.castShadow = true;
    //////////////////////////////////////////////

   

    //////////////////////////////////////////////
    monitor = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 0.08),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: silver
        })
    );
    scene.add(monitor);
    monitor.position.set(0,.8,0.05);
    monitor.rotation.x += Math.PI / 30;
    //////////////////////////////////////////////

    

    //////////////////////////////////////////////
    scrn = new THREE.Mesh(
        new THREE.BoxGeometry(1.35, 1.35, 0.001),
        new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: sc
        })
    );
    scene.add(scrn);
    scrn.position.set(0,.8,-0);
    scrn.rotation.x += Math.PI / 30;
    scrn.receiveShadow = true;
    scrn.castShadow = true;
    //////////////////////////////////////////////


    //////////////////////////////////////////////
    flr = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 100, 100),
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            wireframe: false,
            map: mainTex
        })
    );
    flr.rotation.x -= Math.PI / 2;
    flr.receiveShadow = true;
    scene.add(flr);
   //////////////////////////////////////////////
    
    
  //////////////////////////////////////////////
  cpu_front = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 1, 0.01), //////////////////////////////////////////////w,h,d
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: cpu1,
    })
  );
  scene.add(cpu_front);
  cpu_front.position.set(-1.44, 0.5, 0);
  

  //////////////////////////////////////////////
  cpu_side = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 3.6, 0.5), //////////////////////////////////////////////w,h,d
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: silver,
    })
  );
  scene.add(cpu_side);

  cpu_side.position.set(-1.44, -0.7, 0.25);
  

  //////////////////////////////////////////////
  cpu3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 1, 0.47), //////////////////////////////////////////////w,h,d
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: cpu2,
    })
  );
  scene.add(cpu3);
  cpu3.position.set(-1.21, 0.5, 0.25);
  cpu3.receiveShadow = true;
  cpu3.castShadow = true;
  
  

  
  
  ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  //////////////////////////////////////////////
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  light.castShadow = true;
  light.shadow.camera.near = 0.8;
  light.shadow.camera.far = 30;
  scene.add(light);
  //////////////////////////////////////////////

  //////////////////////////////////////////////
  camera.position.set(0, eye.height, -1.5);
  camera.lookAt(new THREE.Vector3(0, eye.height, 0));
  //////////////////////////////////////////////

  	
  //////////////////////////////////////////////
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x00002a, 1);
  document.body.appendChild(renderer.domElement);
  renderer.physicallyCorrectLights = false;
  //////////////////////////////////////////////

  resizeRendererToDisplaySize(renderer);

  {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
   
  ////////////////////////////////////////////// to animate call
  animate(); 
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

//////////////////////////////////////////////
function animate() {
    requestAnimationFrame(animate);
	
	//q
    if (keyboard[69]) {
        camera.rotation.y -= Math.PI * 0.01;
    }
    //e
    if (keyboard[81]) {
        camera.rotation.y += Math.PI * 0.01;
    }
	//u
	if (keyboard[85]) {
        camera.rotation.x -= Math.PI * 0.01;
    }
	
	//n
	if (keyboard[78]) {
        camera.rotation.x += Math.PI * 0.01;
    }
	
	//t
	if (keyboard[84]) {
        camera.position.z -= Math.PI * 0.01;
        camera.position.y += Math.cos(camera.rotation.y) * 0.1;
		//camera.position.z += Math.PI * 0.01;
		
    }
	//v
	if (keyboard[86]) {
        camera.position.z += Math.PI * 0.01;
        camera.position.y -= Math.cos(camera.rotation.y) * 0.1;
		//camera.position.z += Math.PI * 0.01;
		
    }
	
	//i
	if (keyboard[73]) {
        camera.rotation.z += Math.PI * 0.01;
    }
	//m
	if (keyboard[77]) {
        camera.rotation.z -= Math.PI * 0.01;
    }

    //Up w
    if (keyboard[87]) {
        camera.position.x -= Math.sin(camera.rotation.y) * eye.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * eye.speed;
    }
    //Down s
    if (keyboard[83]) {
        camera.position.x += Math.sin(camera.rotation.y) * eye.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * eye.speed;
    }
    //left a
    if (keyboard[65]) {
        camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * eye.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * eye.speed;
    }
    //Right d
    if (keyboard[68]) {
        camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * eye.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * eye.speed;
    }

    

    //////////////////////////////////////////////
    if (degree < 360) {
        degree += 0.8;
    } else {
        degree = 0;
    }

    light.position.x = Math.sin(degree * Math.PI / 180) * 5;
    light.position.z = Math.cos(degree * Math.PI / 180) * 5;
    //////////////////////////////////////////////

    renderer.render(scene, camera);
}
//////////////////////////////////////////////

function keyDown(event) {
  keyboard[event.keyCode] = true;
}

function keyUp(event) {
  keyboard[event.keyCode] = false;
}

//////////////////////////////////////////////
function onClick(event) {

    if (click <= 5) {
        click += 1;
    } else {
        click = 1;
    }
    //////////////////////////////////////////////
    
    


    switch (click) {
        case 1:
            scrn = new THREE.Mesh(
                new THREE.BoxGeometry(1.35, 1.35, 0.001),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    map: hulk
                })
            );
            break;
        case 2:
            scrn = new THREE.Mesh(
                new THREE.BoxGeometry(1.35, 1.35, 0.001),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    map: ironman
                })
            );
            break;
        case 3:
            scrn = new THREE.Mesh(
                new THREE.BoxGeometry(1.35, 1.35, 0.001),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    map: captain
                })
            );
            break;
        case 4:
            scrn = new THREE.Mesh(
                new THREE.BoxGeometry(1.35, 1.35, 0.001),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    map: batman
                })
            );
            break;
        case 5:
            scrn = new THREE.Mesh(
                new THREE.BoxGeometry(1.35, 1.35, 0.001),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    map: joker
                })
            );
            break;
        case 6:
            scrn = new THREE.Mesh(
                new THREE.BoxGeometry(1.35, 1.35, 0.001),
                new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    map: deadpool
                })
            );
            break;
        
        default:
    }
    scene.add(scrn);
	
    scrn.position.set(0,.8,0);
    scrn.rotation.x += Math.PI / 30;
    scrn.receiveShadow = true;
    scrn.castShadow = true;
}
//////////////////////////////////////////////

//////////////////////////////////////////////
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
window.addEventListener('click', onClick);
//////////////////////////////////////////////

window.onload = init; //////////////////////////////////////////////