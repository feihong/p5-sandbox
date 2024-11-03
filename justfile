help:
	just --list

dev:
	bun --watch src/index.ts

build:
	bun build src/index.ts --target bun --outdir ./dist

start:
	NODE_ENV=production bun dist/index.js

install:
	bun install
