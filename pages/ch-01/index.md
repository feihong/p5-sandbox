# Chapter 0: Randomness

Source: https://natureofcode.com/random/

<p5-sketch title="Example 0.1: A traditional random walk" width="640" height="240" src="walker.js"></p5-sketch>

<p5-sketch title="Example 0.2: A random number distribution" width="640" height="240" src="random-dist.js"></p5-sketch>

<p5-sketch title="Exercise 0.1: A walker that tends to move down and to the right" width="640" height="240" src="walker-se.js"></p5-sketch>

### Exercise 0.2

What is the probability of drawing two aces in a row from a deck of 52 cards, if you reshuffle your first draw back into the deck before making your second draw? What would that probability be if you didn’t reshuffle after your first draw?

The probability of drawing two aces with replacement is $\frac{4}{52} \cdot \frac{4}{52} = \frac{1}{169} \approx 0.59\%$. Without replacement: $\frac{4}{52} \cdot \frac{3}{52} = \frac{3}{676} \approx 0.44\%$.

### Exercise 0.3

Create a random walker with dynamic probabilities. For example, can you give it a 50 percent chance of moving in the direction of the mouse? Remember, you can use `mouseX` and `mouseY` to get the current mouse position in p5.js!

<p5-sketch title="Example 0.4: A Gaussian distribution" width="640" height="240" src="gaussian-dist.js"></p5-sketch>
