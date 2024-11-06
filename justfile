help:
	just --list

dev:
	bun --watch src/index.mts

build:
	bun build src/index.mts --target bun --outdir ./dist

start:
	NODE_ENV=production bun dist/index.js

install:
	bun install
