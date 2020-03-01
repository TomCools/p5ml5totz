// Images and game objects
let bgImg;
let totzImg;
let totz;
let floor;
let state = 'Close';

// Forces
let gravityForce;
let jumpForce;

// Machine learning
let classifier;
// Model URL (Change this URL with your own model if you want it trained for something else than my plushy :-)
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/HRoMDshS/';

function preload() {
    // Load the model :-)
    classifier = ml5.imageClassifier(imageModelURL + 'model.json', modelLoaded);

    bgImg = loadImage('assets/background.png');
    totzImg = loadImage('assets/totzSprite.png');
}

function setup() {
    let canvas = createCanvas(640, 360);
    canvas.parent("container");

    totz = new Totoro(100,100, totzImg);

    floor = new Floor(height - 30);

    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide()

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

    // Not drawing the floor, the background image already looks like a floor :-)
    //floor.display();
}

function jump() {
    totz.applyForce(jumpForce);
}

// This method gets invoked by P5.js on touch / click
function touchStarted() {
    this.jump();
}

// As loading the model can take a while, we'll use a callback function.
// Once the model is loaded, we'll start classifying every 100ms.
function modelLoaded() {
    console.log('Model Loaded!');
    setInterval(function(){classifyVideo()},100);
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence, so [0] contains bet result!
    let newState = results[0].label;
    console.log(newState);

    // We consider it a jump when the state goes from
    // arms Open to arms Closed :-)
    if(state === "Open" && newState === "Close") {
        // trigger a jump
        this.jump();
    }
    state = newState;
}