var CollisionHandler = pc.createScript('collisionHandler');

// Hàm này sẽ được gọi khi script được kích hoạt
CollisionHandler.prototype.initialize = function() {
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.collision.on('collisionend', this.onCollisionEnd, this);

    // Lấy các đối tượng cần thiết
    this.root = this.app.root;
    this.player = this.app.root.findByName('Player');
    this.mes = this.app.root.findByName('mes');

    // Cờ để kiểm tra va chạm
    this.isColliding = false;

    // Lắng nghe sự kiện keydown (sẽ chỉ có tác dụng khi có va chạm)
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
};

// Khi va chạm bắt đầu
CollisionHandler.prototype.onCollisionStart = function(result) {
    // Hiển thị mes và thay đổi trạng thái cờ va chạm
    this.mes.enabled = true;
    this.isColliding = true;
};

// Khi va chạm kết thúc
CollisionHandler.prototype.onCollisionEnd = function(result) {
    // Tắt mes và thay đổi trạng thái cờ va chạm
    this.mes.enabled = false;
    this.isColliding = false;
};

// Khi nhấn phím
CollisionHandler.prototype.onKeyDown = function(event) {
    // Kiểm tra nếu phím nhấn là 'F' và đang trong trạng thái va chạm
    if (this.isColliding && event.key === pc.KEY_F) {
        // Kích hoạt hoặc vô hiệu hóa vũ khí
        player.findByName('Sword1').enabled = true;
        player.findByName('Sword2').enabled = false;
        player.findByName('Sword3').enabled = false;
        player.findByName('Sword4').enabled = false;
        player.findByName('Sword5').enabled = false;
    }
};
