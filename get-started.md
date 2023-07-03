---
layout: sketch.njk
title: Get Started
---

Source: https://p5js.org/get-started/

```
function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(140, 150, 230);
  ellipse(200, 100, 100, 100);
}
```

```
let x = 0

function setup() {
  createCanvas(400, 200)
}

function draw() {
  background(140, 150, 230)
  ellipse(x, 100, 100, 100)
  if (x > 450) {
    x = 0
  } else {
    x += 1
  }
}
```

Links:
- [P5.js downloads](https://p5js.org/download/)
