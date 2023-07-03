const markdownIt = require("markdown-it");

function wrapIframe(code) {
	let width = 100;
	let height = 100;
	const match = code.match(/createCanvas\((\d+), (\d+)\)/);
	if (match != null) {
		width = match[1];
		height = match[2];
	}

	const html = `<!DOCTYPE html>
<html>
<head>
<script src="/p5.min.js"></script>
<style>body { padding: 0; margin: 0; overflow: hidden; }</style>
</head>
<body>
<script>${code}</script>
</body></html>`;
	return `<iframe width="${width}" height="${height}" srcdoc="${html.replace(/"/g, '&quot;')}"></iframe>`
}

function updateFenceRenderer(md) {
	const origRenderer = md.renderer.rules.fence;

	md.renderer.rules.fence = function(tokens, idx, options, env, self) {
		const html = origRenderer(tokens, idx, options, env, self);
		// Get rid of markup at front and end
		const code = html.substring(11, html.length - 14);
		const iframe = wrapIframe(code);
		return iframe + '\n' + html;
	};
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
