<template>
  <div :class="{'embetty-tweet': true, answered}">
    <template v-if="fetched">
      <embetty-tweet v-if="isReply" :status="answeredTweetId" :answered="true" />
      <header>
        <img :src="profileImageUrl">
        <span>
          <strong>{{ userName }}</strong>
          <a :href="`https://twitter.com/${screenName}`" target="_blank" rel="noopener" >@{{ screenName }}</a>
        </span>
      </header>
      <article>
        <p v-html="fullText"></p>
        <section v-if="media.length > 0" :class="`media media-${media.length}`">
          <a
            v-for="med in media"
            :key="med.imageUrl"
            :href="med.imageUrl"
            target="_blank">
            <img :src="med.imageUrl">
          </a>
        </section>

        <a
          v-if="links.length > 0"
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="links"
          ref="link">
          <img :src="linkImageUrl">
          <section class="link-body" ref="linkBody">
            <h3>{{ link.title }}</h3>
            <p v-if="linkDescription">{{ linkDescription }}</p>
            <span v-if="linkHostname">{{ linkHostname }}</span>
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
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/element.scss';
@import '@/assets/vars.scss';

$profile-image-width: 36px;
$quoteLineWidth: 4px;

.embetty-tweet.answered {
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

.embetty-tweet {
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

    &:hover,
    &:focus {
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

<style lang="scss">
.embetty-tweet article p a {
  color: #2b7bb9;
  text-decoration: none;

  &:hover {
    color: #3b94d9;
  }

  &:focus {
    text-decoration: underline;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import EmbettyEmbed from '@/components/EmbettyEmbed.vue';

const LINK_IMAGE_SIZE = 125;
const MIN_WINDOW_WIDTH = 600;

@Component({
  name: 'embetty-tweet'
})
export default class EmbettyTweet extends EmbettyEmbed {
  @Prop({
    type: String,
    required: true,
    validator(statusId: string) {
      return /^\d{6,}$/.test(statusId);
    }
  })
  private status!: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private answered!: boolean;


  private linkDescription: string | null = null;


  protected get url(): string | undefined {
    return this._api(`/tweet/${this.status}`);
  }

  private get userName(): string {
    return this.data.user.name;
  }

  private get screenName(): string {
    return this.data.user.screen_name;
  }

  private get fullText(): string {
    return this.data.full_text
      .replace(/(https:\/\/[^\s]+)/g, (link: string) => {
        if (this.media.length > 0 && this.media[0].url === link) {
          return '';
        }

        return `<a href="${link}">${link}</a>`;
      })
      .replace(/#(\w+)/g, (hashtag: string, word: string) => {
        return `<a href="https://twitter.com/hashtag/${word}">${hashtag}</a>`;
      })
      .replace(/@(\w+)/g, (name: string, word: string) => {
        return `<a href="https://twitter.com/${word}">${name}</a>`;
      });
  }

  private get media(): any[] {
    const extended = this.data.extended_entities || {};
    const media = extended.media || [];
    return media.map((m: any, idx: number) => {
      m.imageUrl = `${this.url}-images-${idx}`;
      return m;
    });
  }

  private get links(): any[] {
    return this.data.entities.urls || [];
  }

  private get link(): any {
    return this.links[0];
  }

  private get linkImageUrl(): string {
    return `${this.url}-link-image`;
  }

  private get linkHostname(): string | undefined {
    // adapted from https://stackoverflow.com/a/21553982/451391
    const match = (this.link.url as string).match(/^.*?\/\/(([^:\/?#]*)(?:\:([0-9]+))?)/);
    return match ? match[2] : undefined;
  }

  private get profileImageUrl(): string {
    return `${this.url}-profile-image`;
  }

  private get createdAt(): Date | undefined {
    const createdAt = this.data.created_at.replace(/\+\d{4}\s/, '');
    return new Date(createdAt);
  }

  private get twitterUrl(): string {
    return `https://twitter.com/statuses/${this.data.id_str}`;
  }

  private get answeredTweetId() {
    return this.data.in_reply_to_status_id_str;
  }

  private get isReply() {
    return !!this.answeredTweetId;
  }


  private mounted(): void {
    this.$watch('fetched', (fetched: boolean) => {
      if (fetched) {
        this.fitLinkDescription();
      }
    }, {
      immediate: true
    });

    if (window) {
      window.addEventListener('resize', () => {
        if (window.innerWidth < MIN_WINDOW_WIDTH) {
          return;
        }

        this.fitLinkDescription();
      });
    }
  }


  private fitLinkDescription(): void {
    if (!this.link || !window) {
      return;
    }

    // reset link description to the one returned by the API
    this.linkDescription = this.link.description;

    if (!this.linkDescription) {
      return;
    }

    const section = this.$refs.link as Element;
    const linkBody = this.$refs.linkBody as Element;

    // don't do anything if the mobile view is active
    if (section.clientWidth === linkBody.clientWidth) {
      return;
    }

    const imgHeight = LINK_IMAGE_SIZE;
    let counter = 0;
    let last = '';

    const computedStyle = window.getComputedStyle(section);

    const height = (element: Element) => {
      const elemMarginTop = parseFloat(computedStyle.getPropertyValue('margin-top'));
      const elemarginBottom = parseFloat(computedStyle.getPropertyValue('margin-bottom'));
      const elemHeight = parseFloat(computedStyle.getPropertyValue('height'));

      return elemHeight + elemMarginTop + elemarginBottom;
    };

    const reduceLinkDescriptionLength = () => {
      if (counter >= 200 || last === this.linkDescription) {
        return;
      }

      if ((height(section) - 2) <= imgHeight) {
        return;
      }

      last = this.linkDescription as string;
      this.linkDescription = (this.linkDescription as string).replace(/\W*\s(\S)*$/, '…');
      counter++;

      // wait for Vue to render until we measure again
      this.$nextTick(reduceLinkDescriptionLength);
    };

    this.$nextTick(reduceLinkDescriptionLength);
  }
}
</script>
