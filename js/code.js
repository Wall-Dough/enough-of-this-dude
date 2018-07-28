var OVERLAY_LOCATION = "img/template_i'vehadenoughofthisdude.png";

var START_X = 162;
var START_Y = 49;
var WIDTH = 152;
var HEIGHT = 193;

function setupCanvas(thisDude) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  var overlay = document.createElement("img");
  overlay.setAttribute("src", OVERLAY_LOCATION);

  canvas.setAttribute("width", overlay.naturalWidth);
  canvas.setAttribute("height", overlay.naturalHeight);

  var thisDudeWidth = WIDTH;
  var thisDudeHeight = thisDude.naturalHeight * WIDTH / thisDude.naturalWidth;
  if (thisDudeHeight < HEIGHT) {
    thisDudeHeight = HEIGHT;
    thisDudeWidth = thisDude.naturalWidth * HEIGHT / thisDude.naturalHeight;
  }
  var xOffset = (thisDudeWidth - WIDTH) / 2;
  var yOffset = (thisDudeHeight - HEIGHT) / 2;

  ctx.drawImage(thisDude, START_X - xOffset, START_Y - yOffset, thisDudeWidth, thisDudeHeight);
  ctx.drawImage(overlay, 0, 0);

  var result = document.getElementById("result");
  result.src = canvas.toDataURL();
}

function haveEnoughOfThisDude() {
  var filePicker = document.getElementById("file");
  var files = filePicker.files;
  if (files.length <= 0) {
    alert("You have not selected a dude that you've had enough of.");
    return;
  }
  if (!files[0].type.startsWith('image/')) {
    alert("This is not an image of a dude that you've had enough of.");
    return;
  }

  thisDude = document.createElement("img");
  thisDude.file = files[0];

  var reader = new FileReader();
  reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(thisDude);
  reader.readAsDataURL(thisDude.file);
  thisDude.onload = (function(thisDudee) { return function() { setupCanvas(thisDudee); } })(thisDude);
}


window.onload = function () {
  document.getElementById("button").onclick = haveEnoughOfThisDude;
};
