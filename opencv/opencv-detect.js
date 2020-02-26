let video;


let cap = null;

function setup() {
    let canvas = createCanvas(displayWidth, displayHeight);
    canvas.id("output");

    // Create the video
    let constraints = {
        video: {
            facingMode: "environment",
            width: {min: 1280},
            height: {min: 720}
        },
        audio: false
    };
    video = createCapture(constraints);
    video.id("test");
    video.size(displayWidth, displayHeight);
    video.hide();

}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        //jump();
        fullscreen(true);
        test();
    }
}

function touchStarted(event) {
    fullscreen(true);
    setInterval(function () {
        test();
    }, 500);
}

function test() {
    let srcOriginal = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let cap = new cv.VideoCapture("test");
    cap.read(srcOriginal);
    let src = srcOriginal.clone();
    dst = cv.Mat.zeros(src.cols, src.rows, cv.CV_8UC3);

    // Greyscaling
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(src, src, 120, 200, cv.THRESH_BINARY);

    // BLUR
    let ksize = new cv.Size(3, 3);
// You can try more different parameters
    cv.GaussianBlur(src, src, ksize, 0, 0, cv.BORDER_DEFAULT);

    //CONTOUR FINDING
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
// You can try more different parameters
    cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
// draw contours with random Scalar
    for (let i = 0; i < contours.size(); ++i) {
        let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
            Math.round(Math.random() * 255));
        //cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
    }

    //find largest contour and draw bounding box
    let biggestContour = contours.get(0);
    let biggestArea = 0;
    for (let i = 0; i < contours.size(); ++i) {
        let cnt = contours.get(i);
        let rect = cv.boundingRect(cnt);
        let area = rect.width * rect.height;
        if (biggestArea < area) {
            biggestArea = area;
            biggestContour = cnt;
        }
    }
    // Drawing
    let rect = cv.boundingRect(biggestContour);
    let rectangleColor = new cv.Scalar(255, 0, 0);
    let point1 = new cv.Point(rect.x, rect.y);
    let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
    cv.rectangle(srcOriginal, point1, point2, rectangleColor, 2, cv.LINE_AA, 0);

    // only take bounding rectangle, this should take the card only
    srcOriginal = srcOriginal.roi(rect);

    cv.imshow('output', srcOriginal);


    srcOriginal.delete();
    src.delete();
    dst.delete();
    contours.delete();
    hierarchy.delete();
}