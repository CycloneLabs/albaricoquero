# {{ name }}

{{ description }}

## Scripts

- `npm run lint:js` runs eslint for all `.vue` and `.js` files in following directories: `src/`, `test/`, `build/`
- `npm run lint:css` runs stylelint for all `.vue` and `.scss` files in `src/` directory
- `npm run lint` runs `npm run lint:js` and `npm run lint:css`
- `npm run test` runs tests located in `test/` directory
- `npm run dev` builds frontend code, located in `src/` (with `--watch` flag on)
- `npm run build` builds frontend code, located in `src/` (without `--watch` flag, once) to `dist/`

## Fast start (build)

```bash
npm i
npm run build
```

## Fast start (development)

```bash
npm i
npm run dev
```
