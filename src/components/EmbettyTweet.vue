<template>
  <div :class="{'embetty-video': true, answered}">
    <header>
      <img :src="profileImageUrl">
      <span>
        <strong>{{ userName }}</strong>
        <a :href="`https://twitter.com/${screenName}`" target="_blank" rel="noopener" >@{{ screenName }}</a>
      </span>
    </header>
    <article>
      <p>{{ fullText }}</p>
      <section v-if="hasMedia" :class="`media media-${media.length}`">
        <a
          v-for="med in media"
          :key="med.imageUrl"
          :href="med.imageUrl"
          target="_blank">
          <img :src="med.imageUrl">
        </a>
      </section>

      <a
        v-for="link in links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener"
        class="links">
        <img :src="link.imageUrl">
        <section class="link-body">
          <h3>{{ link.title }}</h3>
          <p v-if="link.description">{{ link.description }}</p>
          <span>{{ link.hostname }}</span>
        </section>
      </a>

      <a :href="twitterUrl" target="_blank" rel="noopener" class="created-at">
        <time :datetime="createdAt.toISOString()">{{ createdAt.toLocaleString() }}</time>
        via Twitter
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path style="fill:#1da1f2;" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>
      </a>

      <a href="https://www.heise.de/embetty?wt_mc=link.embetty.poweredby" target="_blank" rel="noopener" class="powered-by" title="embetty - displaying remote content without compromising your privacy.">
        powered by <span class="embetty-logo" v-html="embettyLogo"></span>
      </a>
    </article>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/element.scss';
@import '@/assets/vars.scss';

$profile-image-width: 36px;
$quoteLineWidth: 4px;

.embetty-video.answered {
  margin-top: 0;
  margin-bottom: 0.5rem;
  border: 0;
  padding: 0;

  header {
    padding-bottom: 0.5rem;
  }

  article {
    border-left: $quoteLineWidth solid #bbb;
    margin-left: $profile-image-width / 2 - $quoteLineWidth / 2;
    padding-left: 2rem;
    padding-bottom: 1rem;

    p {
      font-size: 14px;
    }

    .created-at {
      display: none;
    }
  }

  .powered-by {
    display: none;
  }
}

.embetty-video {
  @include host();

  max-width: 642px;
  padding: 1rem 1.2rem;

  @media (min-width: 600px) {
    padding: 1.5rem 2rem;
  }

  header {
    display: flex;
    align-items: center;
    margin-bottom: .5rem;

    img {
      width: $profile-image-width;
      height: $profile-image-width;
      border-radius: 50%;
    }

    > span {
      display: inline-block;
      margin: 0 var(--embetty-spacing, $embetty-spacing);
    }

    strong {
      font-size: 16px;
      display: block;
    }

    a,
    a:hover {
      font-size: 14px;
      color: #697882;
      text-decoration: none;
    }
  }

  article {
    span {
      display: block;
    }

    p {
      margin: 0 auto 0.5rem;
      line-height: 1.4;
      letter-spacing: .01em;

      @media (min-width: 600px) {
        font-size: 18px;
      }

      a {
        color: #012469;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    }
  }

  .media {
    a {
      height: 100%;
      display: flex;
      align-items: center;

      &:not(:first-child) {
        display: none;
      }
    }

    img {
      max-width: 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (min-width: 600px) {
      display: grid;
      grid-column-gap: 1px;
      grid-row-gap: 1px;

      a:not(:first-child) {
        display: block;
      }

      &.media-2 {
        grid-template-columns: 50% 50%;
      }

      &.media-3 {
        grid-template-columns: auto 40%;

        a:first-child {
          grid-row: 1 / span 2;
        }
      }

      &.media-4 {
        grid-template-columns: auto 20%;

        a:first-child {
          grid-row: 1 / span 3;
        }
      }
    }
  }

  .links {
    border: 1px solid var(--embetty-border-color, $embetty-border-color);
    border-width: 1px;
    border-radius: 4px;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    color: #14171a;
    font-size: 14px;

    &:hover {
      background-color: rgb(245, 248, 250);
      border-color: rgba(136,153,166,.5);
      transition: background-color .15s ease-in-out, border-color .15s ease-in-out;
    }

    @media (min-width: 600px) {
      flex-direction: row;
    }

    img {
      max-width: 100%;
      object-fit: cover;
      display: inline-block;

      @media (min-width: 600px) {
        height: 125px;
        width: 125px;
        min-width: 125px;
      }
    }

    & > *:last-child {
      margin-bottom: 0;
    }

    .link-body {
      padding: .5rem;

      @media (min-width: 600px) {
        display: flex;
        flex-direction: column;
        padding: .5rem .8rem;
      }
    }

    h3 {
      font-size: 14px;
      line-height: 1.3;
      margin: 0;
      margin-bottom: .3em;
    }

    p {
      display: none;

      @media (min-width: 600px) {
        display: block;
        flex-grow: 1;
        hyphens: auto;
        line-height: 18px;
        font-size: 14px;
        margin: 0;
        margin-bottom: .3em;
      }
    }

    span {
      margin-top: auto;
      color: #999;
    }
  }

  .created-at {
    margin-top: .5rem;
    display: block;
    font-size: 14px;
    color: #777;
    text-decoration: none;

    svg {
      height: 22px;
      vertical-align: middle;
    }
  }

  .powered-by {
    @include powered-by();
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import EmbettyEmbed from '@/components/EmbettyEmbed.vue';

@Component
export default class EmbettyTweet extends EmbettyEmbed {
  private profileImageUrl: string = '';
  private userName: string = '';
  private screenName: string = '';
  private fullText: string = '';
  private hasMedia: boolean = false;
  private media: object[] = [];
  private links: object[] = [];
  private twitterUrl: string = '';
  private createdAt: Date = new Date();
  private answered: boolean = false;

  @Prop({
    type: String,
    required: true,
    validator(statusId: string) {
      return /^\d{6,}$/.test(statusId);
    }
  })
  private status!: string;
}
</script>
