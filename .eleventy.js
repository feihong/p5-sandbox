const markdownIt = require("markdown-it");

function unescapeHtml(s) {
	return s
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, "\"");
}

function wrapWithP5Constructor(code, sketchId) {
	return `new p5(s => {\n${code}\n}, document.getElementById("${sketchId}"));`;
}

function updateFenceRenderer(md) {
	const origRenderer = md.renderer.rules.fence;

	const newRenderer = function(tokens, idx, options, env, self) {
		const html = origRenderer(tokens, idx, options, env, self);
		// Get rid of markup at front end end, unescape HTML entities
		let code = unescapeHtml(html.substring(11, html.length - 14));
		const sketchId = `sketch-${newRenderer.count}`
    code = wrapWithP5Constructor(code, sketchId);
		newRenderer.count += 1;
		const script = `<div id="${sketchId}"></div>\n<script>\n${code}\n</script>\n`;
		return script + html;
	};
	newRenderer.count = 1;

	md.renderer.rules.fence = newRenderer;
}

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("p5.min.js");
	eleventyConfig.addPassthroughCopy("main.css");

	const md = markdownIt({
		html: true,
		linkify: true,
	});
	updateFenceRenderer(md);
	eleventyConfig.setLibrary("md", md);
};
