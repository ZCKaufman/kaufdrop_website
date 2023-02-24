const model = new rw.HostedModel({
  url: 'https://training-image-experiment-d1522ffd.hosted-models.runwayml.cloud/v1/',
  token: 'IsFQhbYytFR2efM5KodBcg==',
});

const image_input = document.querySelector("#image_input");
img = loadImage(image_input);
img = img.loadPixels()

const inputs = {
  "z": img,
  "truncation": 5
};
model.query(inputs).then(outputs => {
  console.log("HITw")
  const { image } = outputs;
  // use the outputs in your project
  document.getElementById('displayImage1').style.backgroundImage=outputs;
});
//var slider = document.getElementById("myRange");
//var sliderValue = slider.value; // Display the default slider value
//console.log("HIT")
// Update the current slider value (each time you drag the slider handle)

//// You can use the info() method to see what type of input object the model expects
// model.info().then(info => console.log(info))

/*console.log(image_input)
function onUpload(evt) {
  var files = evt.target.files;
  console.log(files);
  var file = Float32Array.from(files[0]);
  const inputs = {
    "z": file,
    "truncation": 5
  };
  model.query(inputs).then(outputs => {
    console.log("HITw")
    const { image } = outputs;
    // use the outputs in your project
    document.getElementById('displayImage1').style.backgroundImage=outputs;
  });
}
 */
