// import 'aframe-html-shader';
//To enable mobile compatibility you must enable the webVR polyfill, as well as enable motion controls in safari: https://github.com/aframevr/aframe/issues/3976
// https://github.com/supermedium/superframe <-- huge collection of aframe components.

AFRAME.registerComponent("wall", {
  init: function() {
    //create image
    var image = document.createElement("a-image");

    var rotation = this.el.object3D.getWorldQuaternion(
      this.el.object3D.rotation
    );
    //set art attribute
    image.setAttribute("art", true);
    image.setAttribute("rotation", rotation);

    //add image to wall segment
    this.el.appendChild(image);
  }
});

AFRAME.registerComponent("single-wall", {
  schema: {
    path: { default: [] },
    width: { default: 1 }
  },
  init: function() {
    //create image
    let data = this.data;

    let width = data.width;
    let length = 10;
    let height = 6;

    console.log(width, length, height);

    console.log(this.data);
    let image = document.createElement("a-image");

    const material = new THREE.MeshPhongMaterial({
      color: "0xffffff" // red (can also use a CSS color string here)
    });

    let geometry = new THREE.BoxGeometry(width, height, length);

    //build mesh
    let mesh = new THREE.Mesh(geometry, material);
    // rotate mesh

    this.el.setObject3D("mesh", mesh);

    // let rotation = this.el.object3D.getWorldQuaternion(
    //   this.el.object3D.rotation
    // );
    //set art attribute
    image.setAttribute("single-wall-art", true);
    // image.setAttribute("rotation", rotation);

    //add image to wall segment
    this.el.appendChild(image);
  }
});

AFRAME.registerComponent("single-wall-art", {
  init: function() {
    this.el.setAttribute("position", "-0.119 1.750 0.115");
    this.el.setAttribute("rotation", "0 -90 0");
    this.el.setAttribute("src", "#cypress");
  }
});

AFRAME.registerComponent("art", {
  init: function() {
    this.el.setAttribute("position", "1.75 1.75 0.115");
    this.el.setAttribute("src", "#cypress");
  }
});

AFRAME.registerPrimitive("a-hall", {
  defaultComponents: {
    tube: {}
  },
  mappings: {
    path: "hall.path",
    width: "hall.width"
  }
});

AFRAME.registerComponent("hall", {
  schema: {
    path: { default: [] },
    width: { default: 1 }
  },
  init: function() {
    var data = this.data;
    var sceneEl = this.el.sceneEl.object3D;
    if (!data.path.length) {
      console.error("[a-hall] `path` property expected but not found.");
      return;
    }
    var path = data.path;
    var pathPointOne = path[0];
    point = pathPointOne.split(" ");
    var pointOne = new THREE.Vector3(
      Number(point[0]),
      Number(point[1]),
      Number(point[2])
    );
    var pathPointTwo = path[1];
    point = pathPointTwo.split(" ");
    var pointTwo = new THREE.Vector3(
      Number(point[0]),
      Number(point[1]),
      Number(point[2])
    );
    var width = data.width;
    var widthAdd = width / 2;
    var length = 10;
    var height = 6;

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000, // red (can also use a CSS color string here)
      flatShading: true
    });

    //prep entites
    var wallOne = document.createElement("a-entity");
    var wallTwo = document.createElement("a-entity");

    var geometry = new THREE.BoxGeometry(width, height, length);
    geometry.translate(0, 0, length / 2);

    this.meshWallOne = new THREE.Mesh(geometry, material);

    // this.meshWallOne.position.copy(pointOne);
    // this.meshWallOne.lookAt(pointTwo);

    wallOne.setAttribute("wall", true);
    wallOne.setAttribute("class", "wallOne");
    wallOne.setAttribute("position", this.meshWallOne.position.copy(pointOne));
    wallOne.setAttribute("rotation", this.meshWallOne.lookAt(pointTwo));
    wallOne.setObject3D("mesh", this.meshWallOne);

    var geometry2 = new THREE.BoxGeometry(width, height, length);
    geometry2.translate(0, 0, length / 2);

    this.meshWallTwo = new THREE.Mesh(geometry2, material);

    this.meshWallTwo.position.copy(pointOne);
    wallTwo.setAttribute("wall", true);
    wallTwo.setAttribute("class", "wallTwo");
    wallTwo.setAttribute("position", {
      x: this.meshWallTwo.position.x,
      y: this.meshWallTwo.position.y,
      z: this.meshWallTwo.position.z + 3
    });
    wallTwo.setAttribute("rotation", this.meshWallTwo.lookAt(pointTwo));

    wallTwo.setObject3D("mesh", this.meshWallTwo);

    this.el.appendChild(wallOne);
    this.el.appendChild(wallTwo);

    // this.el.setObject3D('mesh', this.mesh);
  }
});

// A $( document ).ready() block.
$(document).ready(function() {
  $("#the_scene").on("loaded", function() {
    $("#loading_screen").css("visibility", "hidden");
  });
  setTimeout(function() {
    $("#loading_screen").css("visibility", "hidden");
  }, 2500);
});
