var PlayerAnimationHandler = pc.createScript('playerAnimationHandler');

PlayerAnimationHandler.attributes.add('blendTime', { type: 'number', default: 0.2 });
PlayerAnimationHandler.attributes.add('playerEntity', { type: 'entity' });

PlayerAnimationHandler.prototype.initialize = function () {
    this.temp = null;

    var app = this.app;

    app.keyboard.on(pc.EVENT_KEYDOWN, this.keyChange, this);
    app.keyboard.on(pc.EVENT_KEYUP, this.keyChange, this);

    this.direction = 'Idle';
    this.setDirection('Idle');
};

PlayerAnimationHandler.prototype.checkButtons = function () {
    var app = this.app;

    var w = app.keyboard.isPressed(pc.KEY_W);
    var a = app.keyboard.isPressed(pc.KEY_A);
    var s = app.keyboard.isPressed(pc.KEY_S);
    var d = app.keyboard.isPressed(pc.KEY_D);
    var shift = app.keyboard.isPressed(pc.KEY_SHIFT);

    if (shift && (w || a || s || d)) {
        // Chạy nhanh khi nhấn Shift và phím điều hướng
        this.direction = 'Run';
    } else if (w && !s) {
        if (a && !d) {
            this.direction = 'Walk';
        } else if (d && !a) {
            this.direction = 'Walk';
        } else {
            this.direction = 'Walk';
        }
    } else if (s && !w) {
        if (a && !d) {
            this.direction = 'Walk';
        } else if (d && !a) {
            this.direction = 'Walk';
        } else {
            this.direction = 'Walk';
        }
    } else if (a && !d) {
        this.direction = 'Walk';
    } else if (d && !a) {
        this.direction = 'Walk';
    } else {
        this.direction = 'Idle';
    }
};

PlayerAnimationHandler.prototype.keyChange = function (e) {
    if (this.playerEntity.script.playerManager.isControlling != undefined) {
        if (this.playerEntity.script.playerManager.isControlling) {
            this.tempDirection = this.direction;

            this.checkButtons();
            this.playerEntity.script.playerManager.direction = this.direction;
            if (this.tempDirection !== this.direction) {
                this.setDirection(this.direction);
            }
        }
    }
};

PlayerAnimationHandler.prototype.update = function (dt) {
    if (this.playerEntity.
    script.playerManager.isControlling) {
        // Do nothing in this case
    } else {
        this.direction = this.playerEntity.script.playerManager.Otherdirection;

        if (this.temp !== this.direction) {
            this.temp = this.direction;
            this.setDirection(this.direction);
        }
    }
};

PlayerAnimationHandler.prototype.setDirection = function (direction) {
    this.direction = direction;
    this.entity.animation.play(direction, this.blendTime);
};
