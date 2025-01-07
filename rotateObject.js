// Tạo một script trong PlayCanvas
var RotateObject = pc.createScript('rotateObject');

// Biến lưu trữ tốc độ xoay
RotateObject.prototype.initialize = function() {
    this.rotationSpeed = new pc.Vec3(0, 15, 0); // Xoay 30 độ trên trục Y mỗi giây
};

// Hàm cập nhật xoay vật thể mỗi frame
RotateObject.prototype.update = function(dt) {
    // Tính toán góc xoay theo thời gian
    var rotation = this.rotationSpeed.clone().scale(dt);
    this.entity.rotate(rotation.x, rotation.y, rotation.z);
};
