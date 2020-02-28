class GameObject {
    constructor(x, y) {
        this.position = new createVector(x, y);
        this.velocity = new createVector(0, 0);
        this.acceleration = new createVector(0, 0);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        this.acceleration = new createVector(0,0);
    }

    applyForce(vector) {
        this.acceleration.add(vector);
    }

    // Abstract methods don't exist in Javascript, throwing error
    // Throwing error instead if they are not implemented
    boxes() {
        throw "Bounding boxes not implemented";
    }

    collidesWith(other) {
        var ourBoxes = this.boxes();
        var otherBoxes = other.boxes();
        for (let a = 0; a < ourBoxes.length; ++a) {
            for (let b = 0; b < otherBoxes.length; ++b) {
                if(ourBoxes[a].intersects(otherBoxes[b])) {
                    return true;
                }
            }
        }
        return false;
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