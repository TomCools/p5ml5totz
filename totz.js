class Totoro extends GameObject {
    constructor(startPositionX, startPositionY, image) {
        super(startPositionX, startPositionY);
        this.drawImage = image
        //Width below is set by p5 to the canvas width :-)
        this.width = width / 10;
        this.height = this.width;
    }

    display() {
        // image(..) is a P5.js method to draw an image on the canvas
        image(this.drawImage,
            this.position.x, this.position.y,
            this.width, this.height);
    }

    boxes() {
        return [new BoundingBox(this.position.x, this.position.y, this.width, this.height)];
    }
}