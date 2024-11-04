class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    let choice = floor(random(6));
    switch (choice) {
      case 0:
      case 1:
        this.x++
      case 2:
      case 3:
        this.y++
      case 4:
        this.x--
      case 5:
        this.y--
    }

    this.x = constrain(this.x, 0, width - 1);
    this.y = constrain(this.y, 0, height - 1);
  }
}

const walker =  new Walker();

//{!1} Remember how p5.js works? setup() is executed once when the sketch starts.
window.setup = function() {
  createCanvas(width, height);
  background(245);
}

//{!1} Then draw() loops forever and ever (until you quit).
window.draw = function() {
  // Call functions on the walker.
  walker.step();
  walker.show();
}
