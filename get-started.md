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
new p5(s => {
  s.setup = function() {
    s.createCanvas(400, 400);
  }

  s.draw = function() {
    s.background(140, 150, 230);
    s.ellipse(200, 100, 100, 100);
  }
}, document.getElementById('sketch'))
</script>
