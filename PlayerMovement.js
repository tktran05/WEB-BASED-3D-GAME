var PlayerMovement = pc.createScript('playerMovement');

// Attributes
PlayerMovement.attributes.add('speed', { type: 'number', default: 0.09 });
PlayerMovement.attributes.add('jumpPower', { type: 'number', default: 1000 });
PlayerMovement.attributes.add('charEntity', { type: 'entity' });

PlayerMovement.prototype.initialize = function () {
    var app = this.app;
    var camera = app.root.findByName('cam');
    this.cameraEntity = camera; // Reference to the camera
    this.cameraScript = camera.script.cameraMovement;

    // Track if the player is allowed to jump
    this.isGrounded = 0;

    // Listen for collision events to reset jump state
    this.entity.collision.on('collisionstart', function () {
        this.isGrounded = 0;
        this.gravity = 0;
    }, this);

    this.entity.collision.off('collisionend', function () {
        this.isGrounded = 1;
    }, this);

    this.gravity = 0;
};

// Temp variable to avoid garbage collection
PlayerMovement.worldDirection = new pc.Vec3();
PlayerMovement.tempDirection = new pc.Vec3();

PlayerMovement.prototype.onContact = function (result) {
    if (result.other && result.other.rigidbody) {
        // Reset jump state when touching the ground
        this.isGrounded = 0;
    }
};

PlayerMovement.prototype.update = function (dt) {
    var app = this.app;
    var worldDirection = PlayerMovement.worldDirection;
    worldDirection.set(0, 0, 0);

    var tempDirection = PlayerMovement.tempDirection;

    var forward = this.cameraEntity.forward; // Use camera's forward vector
    var right = this.cameraEntity.right; // Use camera's right vector

    var x = 0;
    var z = 0;

    // Speed multiplier
    var speedMultiplier = 1; // Default speed

    // Check if Shift + W is pressed
    if (app.keyboard.isPressed(pc.KEY_W) && app.keyboard.isPressed(pc.KEY_SHIFT)) {
        speedMultiplier = 3; // Increase speed when Shift is pressed with W
    }

    // Get input directions
    if (app.keyboard.isPressed(pc.KEY_W)) {
        z += 1; // Move forward
    }

    if (app.keyboard.isPressed(pc.KEY_S)) {
        z -= 1; // Move backward
    }

    if (app.keyboard.isPressed(pc.KEY_A)) {
        x -= 1; // Move left
    }

    if (app.keyboard.isPressed(pc.KEY_D)) {
        x += 1; // Move right
    }

    // Calculate movement direction
    if (x !== 0 || z !== 0) {
        worldDirection.add(tempDirection.copy(forward).mulScalar(z));
        worldDirection.add(tempDirection.copy(right).mulScalar(x));
        worldDirection.normalize();

        // Calculate new position
        var pos = new pc.Vec3(worldDirection.x * dt, 0, worldDirection.z * dt);
        pos.normalize().scale(this.speed * speedMultiplier); // Apply speed multiplier
        pos.add(this.entity.getPosition());

        // Calculate rotation based on movement direction
        var angle = Math.atan2(worldDirection.x, worldDirection.z) * pc.math.RAD_TO_DEG;
        var rot = new pc.Quat().setFromEulerAngles(0, angle, 0);

        // Teleport the entity to the new position and apply rotation
        this.entity.rigidbody.teleport(pos, rot);
    }

    // Jump logic (allow up to 2 jumps)
    if (this.isGrounded == 0) {
        this.gravity = 0;
    }

    if (this.isGrounded == 1) {
        // Apply downward force
        this.gravity += dt;
        this.entity.rigidbody.applyForce(0, this.gravity * -4000, 0);
    }

    if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
        if (this.isGrounded == 0) {
            this.entity.rigidbody.applyImpulse(0, this.jumpPower, 0);
            this.isGrounded = 1; // Set to 1 after jumping
        }
    }
};
