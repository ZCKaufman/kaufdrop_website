let input;
let transferStyle;
let inputImg;
let styleImg;
let detector;
let img
let chosenStyle;
let model;

function setup() { // create file input to load image
  input = createFileInput(handleInput);
  input.position(365,750);
  input.style('color', 'white');
  input.style('font-size', '30px');

  style = createButton('Switch Style');
  style.position(670,750);
  style.style('color', 'blue');
  style.style('font-size', '30px');

  let col = color(173,216,230);
  transfer = createButton('Transfer');
  transfer.position(980,750);
  transfer.style('font-size', '30px');
  transfer.style('background-color', col);

  chosenStyle = 0;
  model = 'models/udnie';
  img = loadImage("images/udnie.jpg")

  ///// StyleTransfer /////
  // noCanvas();
  // Status Msg
  statusMsg = select('#statusMsg');

  // Buttons
  style.mousePressed(switchStyle);
  transfer.mousePressed(transferImages);

  transferStyle = ml5.styleTransfer(model, modelLoaded);
}

function draw() { // create canvas to place image on
  createCanvas(1500,500);
  background(255);
  if (img) {
    image(img, 350,0, 750, height);
    //img.center();
  }
  console.log("Style: " + style + " Model: " + model)
}

// A function to be called when the models have loaded
function modelLoaded() {
  // Check if both models are loaded
  if(transferStyle.ready){
    statusMsg.html('Ready!')
  }
}

function handleInput(file) {
  print(file);
  if (file.type === 'image') {
    inputImg = createImg(file.data, '');
    img = inputImg;
    inputImg.hide();
  } else {
    inputImg = null;
  }
}

function switchStyle() {
  if(chosenStyle == 1) {
      img = loadImage("images/udnie.jpg");
      model = 'models/udnie';
      transferStyle = ml5.styleTransfer(model, modelLoaded);
      chosenStyle = 0;
  } else {
      img = loadImage("images/wave.jpg");
      model = 'models/wave';
      transferStyle = ml5.styleTransfer(model, modelLoaded);
      chosenStyle = 1;
  }
}

function transferImages() {
  statusMsg.html('Applying Style Transfer...!');

  /*transferStyle.transfer(inputImg, function(err, result) {
    createImg(result.src).parent('styleA');
  }); */
  transferStyle.transfer(inputImg, function(err, result) {
    img = loadImage(result.src);
  });

  statusMsg.html('Done!');
}
