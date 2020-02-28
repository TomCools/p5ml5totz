let bgImg;
let totzImg;
let totz;
let floor;

let gravityForce;
let jumpForce;

function preload() {
    bgImg = loadImage('assets/background.png');
    totzImg = loadImage('assets/totzSprite.png');
}

function setup() {
    let canvas = createCanvas(640, 360);
    canvas.parent("container");

    totz = new Totoro(100,100, totzImg);

    floor = new Floor(height - 30);

    // Gravity is a downward movement, so the horizontal force is 0.
    // The vertical force is 0.05, meaning down.
    gravityForce = new createVector(0, 0.05);

    // Jumping will be a force vector as well! :-)
    jumpForce = new createVector(0, -3);
}

function draw() {
    background(bgImg);

    // We apply the force before drawing
    totz.applyForce(gravityForce);

    // We calculate the new location by calling update()
    totz.update();

    if (totz.collidesWith(floor)) {
        // Set the entire velocity vector to 0
        totz.velocity.y = 0;
        // Set the new position to the floor
        // This is needed in case the little buddy was falling fast!
        totz.position.y = floor.position.y - totz.height;
    }

    totz.display();
    floor.display();
}

function jump() {
    totz.applyForce(jumpForce);
}

// This method gets invoked by P5.js on touch / click
function touchStarted() {
    jump();
}