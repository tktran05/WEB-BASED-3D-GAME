var Sound = pc.createScript('sound');
// initialize code called once per entity
Sound.prototype.initialize = function(){
    this.entity.sound.play('bgMusic1');
    musicOn = this.app.root.findByName('On');
    musicOff = this.app.root.findByName('Off');
};

// update code called every frame
Sound.prototype.update = function(dt) {
    var sound = this.entity;

    musicOn.element.on('click', function (){
        sound.sound.stop('bgMusic1');
        musicOn.enabled = false;
        musicOff.enabled = true;
    });
        
    musicOff.element.on('click', function (){
        sound.sound.play('bgMusic1');
        musicOff.enabled = false;
        musicOn.enabled = true;
    });
};
