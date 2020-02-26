class GameObject {
    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.position = new createVector(x, y);
    }

    boxes() {
        return new BoundingBox(this.position.x, this.position.y, this.width, this.height);
    }

    drawHitbox() {
        let hitboxes = this.boxes();
        let c = color(255, 0, 0); // Define color 'c'
        noFill(c); // Use color variable 'c' as fill color
        stroke(c); // Don't draw a stroke around shapes
        rect(hitboxes.x, hitboxes.y, hitboxes.width, hitboxes.height);
    }

    collidesWith(other) {
        let result = this.boxes().intersects(other.boxes());
        console.debug("Colliding? " + result);
        return result;
    }
}

class BoundingBox {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    intersects(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
}

class Floor extends GameObject {
    constructor(y) {
        super(0, y, 9000, 10);
    }

    display() {
        let c = color(255, 204, 0); // Define color 'c'
        fill(c); // Use color variable 'c' as fill color
        noStroke(); // Don't draw a stroke around shapes
        rect(this.position.x, this.position.y, 9000, 10);
    }
}