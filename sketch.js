let capture;
let detector,
  detections = [];

function setup() {
  createCanvas(640, 640);

  capture = createCapture({
    video: {
      facingMode: "environment",
    },
    audio: false,
  },VIDEO);
  capture.size(windowWidth, windowWidth);
  capture.hide();

  detector = ml5.objectDetector("cocossd", function () {
		alert("モデルを読み込みました!")
    console.log("Model Loaded!");
    detector.detect(capture, gotDetections);
  });
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(capture, gotDetections);
}

function draw() {
  image(capture.get(), 0, 0);

  for (object of detections) {
    const { x, y, width: w, height: h, label } = object;

    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(x, y, w, h);

    noStroke();
    fill(255);
    textSize(24);
    text(label, x + 10, y + 24);
  }
}
