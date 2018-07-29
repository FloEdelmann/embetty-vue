<template>
  <div id="app">
    <header>
      <h1>embetty</h1>
      <h2>Basic usage</h2>
    </header>
    <main>

      <h3>Tweet</h3>
      <p><a href="tweet.html">More examples</a></p>
      <article>
        <EmbettyTweet status="928365837123227654" />
        <pre><code class="language-html">&lt;EmbettyTweet status=&quot;928365837123227654&quot; /&gt;</code></pre>
      </article>

      <h3>Video</h3>
      <p><a href="video.html">More examples</a></p>
      <article>
        <EmbettyVideo type="youtube" video-id="m6UOo2YGbIE" />
        <pre><code class="language-html">&lt;EmbettyVideo video-id=&quot;m6UOo2YGbIE&quot; type=&quot;youtube&quot; /&gt;</code></pre>
      </article>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EmbettyTweet from '@/components/EmbettyTweet.vue';
import EmbettyVideo from '@/components/EmbettyVideo.vue';

@Component({
  components: {
    EmbettyTweet,
    EmbettyVideo
  }
})
export default class App extends Vue {}
</script>
