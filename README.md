# embetty-vue

Embetty displays remote content like tweets or videos without compromising your privacy.

This is a Vue.js alternative to the original [embetty](https://github.com/heiseonline/embetty) implementation (which is based on Web Components). To use it, you need to have a [embetty server](https://github.com/heiseonline/embetty-server) up and running.


## Usage

```js
import EmbettyVue from 'embetty-vue';

Vue.use(EmbettyVue, {
  // required
  serverUrl: '/path/to/embetty-server', // without trailing spaces

  // optional
  posterImageMode: 'cover' // or 'contain', see example below
});
```

Use like this:

```html
<embetty-tweet status="928365837123227654" />
<embetty-video type="youtube" video-id="m6UOo2YGbIE" />
```

See [`src/App.vue`](src/App.vue) for a lot of examples.


## Development

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run unit tests

```
npm run test:unit
```

### Run end-to-end tests

```
npm run test:e2e
```
