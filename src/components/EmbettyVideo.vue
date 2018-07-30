<template>
  <div class="embetty-video">
    <button type="button" class="playbutton">
      <svg viewBox="0 0 200 200" class="playicon">
        <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>
        <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>
      </svg>
    </button>
    <div class="poster">
      <img :src="posterImageUrl">
    </div>
    <a href="https://www.heise.de/embetty" target="_blank" rel="noopener" class="powered-by" title="embetty - displaying remote content without compromising your privacy.">
      powered by <span class="embetty-logo" v-html="embettyLogo"></span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/element.scss';

.embetty-video {
  @include host();

  .poster {
    position: relative;
    overflow: hidden;
    max-height: (100 / 16 * 9)px;

    img {
      display: block;
      width: 100%;
    }
  }

  .playbutton {
    box-sizing: border-box;
    display: block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    border: 0;
    opacity: 0.9;
    background: none;
    cursor: pointer;
    background-image: linear-gradient(transparent, #000);
    transition: opacity 150ms;

    &:hover {
      opacity: 1;
    }
  }

  .playicon {
    width: 100px;
    height: 100px;
  }

  .wrapper {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 0px;
    height: 0;
    overflow: hidden;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .powered-by {
    @include powered-by();

    -webkit-font-smoothing: antialiased;

    color: #fff;
    opacity: .6;

    &:hover {
      opacity: 1;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { EmbettyVideoTypes } from '@/enums/EmbettyVideoTypes';
import EmbettyEmbed from '@/components/EmbettyEmbed.vue';

import VideoImpl from '@/interfaces/VideoImpl';
import { videoImplementations } from '@/components/video-impl/index';

@Component
export default class EmbettyVideo extends EmbettyEmbed {
  @Prop({
    type: String,
    required: true,
    validator(videoType: string) {
      return Object.keys(EmbettyVideoTypes).includes(videoType);
    }
  })
  private type!: string;

  @Prop({
    type: String,
    required: true,
    validator(videoId: string) {
      return /^[a-zA-Z0-9_-]{6,}$/.test(videoId);
    }
  })
  private videoId!: string;

  @Prop({
    type: Number,
    required: false,
    default: 0,
    validator(startAt: number) {
      return startAt % 1 === 0;
    }
  })
  private startAt?: number;


  private get impl(): VideoImpl {
    const className = this.type.charAt(0).toUpperCase() + this.type.slice(1) + 'Video';

    if (!(className in videoImplementations)) {
      throw new Error(`Could not find class ${className}. Please specify a valid video type.`);
    }

    return videoImplementations[className];
  }

  private get posterImageUrl(): string {
    return this._api(this.impl.getPosterImageApiEndpoint(this.videoId));
  }
}
</script>
