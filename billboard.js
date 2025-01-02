var Billboard = pc.createScript('billboard');
Billboard.attributes.add('playerManager', { type: 'entity' });
Billboard.prototype.initialize = function () {
    this.camera = this.app.root.findByName('Camera');
};

Billboard.prototype.update = function (dt) {
    if(this.camera!==null)
        {
    this.entity.setRotation(this.camera.getRotation());
    this.entity.rotateLocal(90, 0, 180);
        }else{
            if(this.app.root.findByName('Camera'))
                {
            this.camera = this.app.root.findByName('Camera');
                }
        }
};