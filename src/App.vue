<template>
  <div id="app">
    <h1>embetty-vue</h1>

    <header>Also try resizing the page!</header>


    <h2>Tweet</h2>

    <article>
      <h3>Basic usage</h3>
      <embetty-tweet status="928365837123227654" />
      <pre class="language-html"><code>&lt;embetty-tweet status="928365837123227654" /&gt;</code></pre>
    </article>


    <h2>Video</h2>

    <article>
      <h3>YouTube</h3>
      <embetty-video type="youtube" video-id="m6UOo2YGbIE" />
      <pre class="language-html"><code>&lt;embetty-video type="youtube" video-id="m6UOo2YGbIE" /&gt;</code></pre>
    </article>

    <article>
      <h3>YouTube with <code>width</code></h3>
      <p>Aspect ratio of 16:9 is preserved.</p>
      <embetty-video type="youtube" video-id="3L4fHrIJ3A4" :width="500" />
      <pre class="language-html"><code>&lt;embetty-video type="youtube" video-id="3L4fHrIJ3A4" :width="500" /&gt;</code></pre>
    </article>

    <article>
      <h3>YouTube with <code>height</code> and <code>width</code></h3>
      <p>Poster image is cropped.</p>
      <embetty-video
        type="youtube"
        video-id="3L4fHrIJ3A4"
        :height="200"
        :width="500" />
      <pre class="language-html"><code>&lt;embetty-video
    type="youtube"
    video-id="3L4fHrIJ3A4"
    :height="200"
    :width="500" /&gt;</code></pre>
    </article>

    <article>
      <h3>YouTube with <code>height</code> and <code>poster-image-mode="contain"</code></h3>
      <p>Width is still 100%.</p>
      <embetty-video
        type="youtube"
        video-id="3L4fHrIJ3A4"
        :height="200"
        poster-image-mode="contain" />
      <pre class="language-html"><code>&lt;embetty-video
    type="youtube"
    video-id="3L4fHrIJ3A4"
    :height="200"
    poster-image-mode="contain" /&gt;</code></pre>
    </article>

    <article>
      <h3>Vimeo with <code>start-at</code></h3>
      <embetty-video type="vimeo" video-id="1084537" :start-at="97" />
      <pre class="language-html"><code>&lt;embetty-video type="vimeo" video-id="1084537" :start-at="97" /&gt;</code></pre>
    </article>

    <article>
      <h3>Facebook</h3>
      <embetty-video type="facebook" video-id="10156049485672318" />
      <pre class="language-html"><code>&lt;embetty-video type="facebook" video-id="10156049485672318" /&gt;</code></pre>
    </article>
  </div>
</template>

<style lang="scss" scoped>
// Demo styling
#app {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  max-width: 900px;
  margin: 0 auto;
}

header {
  padding: 1ex;
  margin: 1.5em 0 2.5em;
  background: rgb(255, 238, 140);
}

article {
  margin-bottom: 2.5em;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>
