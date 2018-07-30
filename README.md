# embetty-vue

## Usage

```js
import EmbettyVue from 'embetty-vue';

Vue.use(EmbettyVue, {
  serverUrl: '/path/to/embetty-server'
});
```

Use like this:

```html
<EmbettyTweet status="928365837123227654" />
<EmbettyVideo type="youtube" video-id="m6UOo2YGbIE" />

or

<embetty-tweet status="928365837123227654" />
<embetty-video type="youtube" video-id="m6UOo2YGbIE" />
```

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
