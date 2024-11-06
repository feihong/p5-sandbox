const [width, height] = getDimensions()

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
    // 27% chance of going right or down, 23% change of going left or up
    let choice = random(100);
    if (choice < 27) {
      this.x++;
    } else if (choice < 54) {
      this.y++;
    } else if (choice < 77) {
      this.x--;
    } else {
      this.y--;
    }

    this.x = constrain(this.x, 0, width - 1);
    this.y = constrain(this.y, 0, height - 1);
  }
}

const walker =  new Walker();

function setup() {
  createCanvas(width, height);
  background(245);
}

function draw() {
  walker.step();
  walker.show();
}
