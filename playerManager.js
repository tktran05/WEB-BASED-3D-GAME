var PlayerManager = pc.createScript('playerManager');


    this.clientID=null;
    this.playerName=null;
    this.isControlling=false;
  
// initialize code called once per entity
PlayerManager.prototype.initialize = function() {
    this.networkEntity= this.app.root.findByName('MenuCamera').parent;
    // this.clientID=null;
    // this.playerName=null;
    // this.isControlling=false;
     this.direction='Idle';
     this.Otherdirection='Idle';
};

// update code called every frame
PlayerManager.prototype.update = function(dt) {
  
    
    if(this.clientID==this.networkEntity.script.network._clientID)
        {
            
            this.isControlling=true;
         //  console.log("Controlling ",this.playerName);
        }
    else{
        
        // console.log("Not Controlling ",this.playerName);
        
    }
//console.log(this.direction);
};

// swap method called for script hot-reloading
// inherit your script state here
// PlayerManager.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/