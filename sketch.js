let totz;
let floor;
let state = 'Close';

let gravity;
let jumpForce;

let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/HRoMDshS/';
// Video
let video;
let flippedVideo;
let bg;

function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json', modelLoaded);
    bg = loadImage('assets/background.png');
    totzImg = loadImage('assets/totoroSprite.png');
    noLoop();
}

function modelLoaded() {
    console.log('Model Loaded!');
    loop()
}


function setup() {
    let canvas = createCanvas(640, 360);
    canvas.parent("ex-1");
    canvas.id("test");
    totz = new Totoro();
    floor = new Floor(height-30);
    jumpForce = new createVector(0, -3);
    gravity = new createVector(0, 0.05);

    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    //video.hide();

    flippedVideo = ml5.flipImage(video)
    // Start classifying
    setInterval(function(){classifyVideo()},100);
}

function draw() {
    background(bg);

    totz.applyForce(gravity);

    if (totz.collidesWith(floor)) {
        totz.velocity.limit(0);
        totz.position.y = floor.position.y - totz.height;
    }

    totz.update();
    totz.display();
    //floor.display();

    //Debugging
    //totz.drawHitbox();
    //floor.drawHitbox();
}


function jump() {
    console.log('jumping!');
    totz.applyForce(jumpForce);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        //jump();
        templateMatch();
    }
}

function templateMatch() {
    let src = cv.imread('test');
    let template = cv.imread()
}

// Get a prediction for the current video frame
function classifyVideo() {
    //flippedVideo = ml5.flipImage(video)
    classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    console.log(label);
    if(state === "Open" && label === "Close") {
        jump();
    }
    state = label;
}