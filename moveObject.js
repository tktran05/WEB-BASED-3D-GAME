var MoveObject = pc.createScript('moveObject');
    var up = true
    var down = false
// initialize code called once per entity
MoveObject.prototype.initialize = function() {

};

// update code called every frame
MoveObject.prototype.update = function(dt) {

    pos = this.entity.getPosition()
    if (pos.y > 370){
        up = false
        down = true
    }

    else if (pos.y <70) {
        up = true
        down = false
    }

    if(up){
        this.entity.translateLocal(0,0.1,0)

    }
    else if (down){
        this.entity.translateLocal(0,-0.1,0)
    }

};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// MoveObject.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/