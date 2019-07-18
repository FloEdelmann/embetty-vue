# embetty-vue [![npm](https://img.shields.io/npm/v/embetty-vue.svg)](https://www.npmjs.com/package/embetty-vue)

Embetty displays remote content like tweets or videos without compromising your privacy.

This is a Vue.js alternative to the original [embetty](https://github.com/heiseonline/embetty) implementation (which is based on Web Components). To use it, you need to have a [embetty server](https://github.com/heiseonline/embetty-server) up and running.


## Usage

### Setup when using a bundler (webpack, rollup, etc.)

```js
import Vue from 'vue';
import EmbettyVue from 'embetty-vue'; // or 'embetty-vue/dist/embetty-vue.esm.js'
// or
const Vue = require('vue');
const EmbettyVue = require('embetty-vue'); // or 'embetty-vue/dist/embetty-vue.common.js'

Vue.use(EmbettyVue, {
  // optional, but recommended
  serverUrl: '/path/to/embetty-server', // without trailing slash

  // optional
  posterImageMode: 'cover' // or 'contain'
});
```

The CSS can be imported from `embetty-vue/dist/embetty-vue.css`.


### Setup when directly linking the files

In your HTML head:

```html
<link rel="stylesheet" type="text/css" href="dist/embetty-vue.min.css" />
<meta data-embetty-server="/path/to/embetty-server" /> <!-- without trailing slash -->
<script type="text/javascript" src="vue.js"></script>
<script type="text/javascript" src="dist/embetty-vue.min.js"></script>
```

You can link to the files without `.min` for debugging.

### Using the components

```html
<embetty-tweet status="928365837123227654" />
<embetty-video type="youtube" video-id="m6UOo2YGbIE" />
```

If you didn't specify the server URL globally (either the options passed to `Vue.use` or the `<meta>` tag), you must specify it on every component:

```html
<embetty-tweet server-url="/path/to/embetty-server" status="928365837123227654" />
<embetty-video server-url="/path/to/embetty-server" type="youtube" video-id="m6UOo2YGbIE" />
```

See [`src/App.vue`](src/App.vue) for a lot of examples and component options.


## Differences to original implementation

*embetty-vue*'s `<embetty-video>` component supports type `native`: Provide an URL to a video file as `video-id` to load it on click in a `<video>` HTML element.


## Development

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run watch
```

### Compiles and minifies for production

```
npm run build
```
