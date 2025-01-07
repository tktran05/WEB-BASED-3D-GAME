var Tele = pc.createScript('tele');

Tele.prototype.initialize = function() {
    this.app.keyboard.on(pc.KeyboardEvent.KEYDOWN, this.onKeyDown, this);
    plane1 = this.app.root.findByName('place1')
    plane2 = this.app.root.findByName('place2')
    plane3 = this.app.root.findByName('place3')
};

Tele.prototype.update = function (dt) {
    var app = this.app
    if (app.keyboard.wasPressed(pc.KEY_1)) {
        this.entity.rigidbody.teleport(35.642,29.549,85.426);
    }


    else if(app.keyboard.wasPressed(pc.KEY_2)){
        this.entity.rigidbody.teleport(99.26,67.598,26.766)
    }

    else if(app.keyboard.wasPressed(pc.KEY_3)){
        this.entity.rigidbody.teleport(19.749,104.778,52.885)
    }

    else if(app.keyboard.wasPressed(pc.KEY_4)){
        this.entity.rigidbody.teleport(-63.038,140.084,100.332)
    }

    else if(app.keyboard.wasPressed(pc.KEY_5)){
        this.entity.rigidbody.teleport(30.481,184.876,-9.335)
    }

    else if (app.keyboard.wasPressed(pc.KEY_6)) {
        
        var pos = plane1.getPosition()
        console.log(pos)
        this.entity.rigidbody.teleport(pos)
    }

    else if (app.keyboard.wasPressed(pc.KEY_7)) {
        
        var pos = plane2.getPosition()
        console.log(pos)
        this.entity.rigidbody.teleport(pos)
    }

    else if (app.keyboard.wasPressed(pc.KEY_8)) {
        
        var pos = plane3.getPosition()
        console.log(pos)
        this.entity.rigidbody.teleport(pos)
    }
};

