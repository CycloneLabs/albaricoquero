# {{ name }}

## {{ description }}

### Fast start
configure your settings by `config.json`
use `npm install` to install dependencies
and `npm run build` for build application once
or  `npm run dev` for development with watchers and hot-reload

### Sources structure
`js` - directory with javascript sources.
`root` - flat directory, for "root" sources like favicon.
`view` - directory for pug files, may be hierarchical. (Excluding by underscore)
`scss` - directory for scss files, may be hierarchical. (Excluding by underscore)
`image` - directory for image sources, should be hierarchical.

### Compiled structure
`/` - contains "root" sources and compiled pug files.
`/image` - contains "image" sources
`/bundle` - contains bundle.js and style.css with source maps
