class Totoro extends GameObject {
    constructor() {
        super(200, 100, 48,48);
        this.velocity = new createVector(0, 0);
        this.acceleration = new createVector(0, 0);
    }

    update() {
        // Add the current speed to the position.
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        this.acceleration = new createVector(0,0);
    }

    applyForce(vector) {
        this.acceleration.add(vector);
    }

    display() {
        image(totzImg, this.position.x, this.position.y, this.width, this.height);
    }
}