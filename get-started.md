---
layout: sketch.njk
title: Get Started
---

<div id=sketch></div>

<div id=code></div>

Links:
- [Get started](https://p5js.org/get-started/)
- [P5.js downloads](https://p5js.org/download/)

<script>
function setup() {
  const cnv = createCanvas(400, 400);
  cnv.parent('sketch')
}

function draw() {
  background(100, 100, 230);
  ellipse(100, 150, 100, 120);
}
</script>
