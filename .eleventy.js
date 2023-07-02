module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("p5.min.js");
	eleventyConfig.addPassthroughCopy("main.css");
};
