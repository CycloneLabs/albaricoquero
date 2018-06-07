# Albaricoquero

> A full-featured Webpack setup with hot-reload, lint-on-save, pug & scss support.
> This template is Vue 2.0 compatible.

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init CycloneLabs/albaricoquero my-project
$ cd my-project
$ npm install
$ npm run dev
```

The development server will run on port 8080 by default. If that port is already in use on your machine, the next free port will be used.

## What's Included

- `npm run dev`:
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony).
  - CSS/SCSS across all components injected to `<style></style>`.
  - Separate `scss/style.scss` file extracted into `bundle/style.css`
