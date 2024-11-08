class Walker {
  constructor() {
    // Objects have data.
    this.x = width / 2;
    this.y = height / 2;
  }

  // Objects have methods.
  show() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    let choice = random(100);
    if (choice < 25) {
      this.x++;
    } else if (choice < 50) {
      this.x--;
    } else if (choice < 75) {
      this.y++;
    } else {
      this.y--;
    }
  }
}

const walker =  new Walker();

//{!1} Remember how p5.js works? setup() is executed once when the sketch starts.
function setup() {
  createCanvas(width, height);
  background(245);
}

//{!1} Then draw() loops forever and ever (until you quit).
window.draw = function() {
  // Call functions on the walker.
  walker.step();
  walker.show();
}
