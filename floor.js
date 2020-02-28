class Floor extends GameObject {
    // The floor will be a straight line
    constructor(y) {
        super(0, y);
        this.width = 9000; // making floor large enough to always be covered
        this.height = 10;
    }

    display() {
        // color, fill, noStroke and rect are all P5.js functions
        let c = color(255, 204, 0); // Define color 'c'
        fill(c); // Use color variable 'c' as fill color
        noStroke(); // Don't draw a stroke around shapes
        rect(this.position.x, this.position.y, 9000, 10);
    }

    boxes() {
        return [new BoundingBox(this.position.x, this.position.y, this.width, this.height)];
    }
}