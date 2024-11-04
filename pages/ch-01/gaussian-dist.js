window.setup = function() {
  createCanvas(640, 240);
  background(255);
}

window.draw = function() {
  //{!1} A normal distribution with mean 320 and standard deviation 60
  let x = randomGaussian(320, 60);
  noStroke();
  fill(0, 10);
  circle(x, 120, 16);
}
