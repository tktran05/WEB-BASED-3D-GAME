var AttachCamera = pc.createScript('attachCamera');
 var player=null;
var cameraScript=null;
var menuCamera=null;

// initialize code called once per entity
AttachCamera.prototype.initialize = function() {
   // player = this.app.root.findByName('Player');   
    menuCamera= this.app.root.findByName('MenuCamera');
};

// update code called every frame
AttachCamera.prototype.update = function(dt) {
    if(this.app.root.findByName('Player')!=null && !this.initialize)
    {
      menuCamera.enabled=false;
        this.initialize=true;
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// AttachCamera.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/