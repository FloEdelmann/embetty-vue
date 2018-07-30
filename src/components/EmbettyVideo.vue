<template>
  <div class="embetty-video" :style="{ 'width': width === null ? null : `${width}px` }">
    <button type="button" class="playbutton">
      <svg viewBox="0 0 200 200" class="playicon">
        <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>
        <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>
      </svg>
    </button>
    <div
      :class="{
        'poster': true,
        'default-size': height === null,
        'contain': posterImageMode === 'contain'
      }"
      :style="{
        'backgroundImage': `url(${posterImageUrl})`,
        'height': height === null ? null : `${height}px`
      }">
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
    background: no-repeat center black;
    background-size: cover;

    &.contain {
      background-size: contain;
    }

    &.default-size {
      height: 0;
      padding-top: 56.25%; // percentage values in padding refer to width; creates a 16:9 ratio
    }
  }

  .playbutton,
  .playbutton:active {
    box-sizing: border-box;
    display: block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    outline: 0;
    opacity: 0.9;
    background: none;
    cursor: pointer;
    background-image: linear-gradient(transparent, #000);
    transition: opacity 150ms;

    &:hover,
    &:focus {
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
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import EmbettyEmbed from '@/components/EmbettyEmbed.vue';

import VideoImpl from '@/interfaces/VideoImpl';
import { videoImplementations } from '@/components/video-impl/index';

@Component
export default class EmbettyVideo extends EmbettyEmbed {
  @Prop({
    type: Number,
    required: false,
    default: null
  })
  protected width!: number | null;

  @Prop({
    type: Number,
    required: false,
    default: null
  })
  protected height!: number | null;

  @Prop({
    type: String,
    required: true,
    validator(videoType: string) {
      return Object.keys(videoImplementations).includes(videoType);
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

  @Prop({
    type: String,
    required: false,
    default: null
  })
  private posterImageMode?: string | null;


  private get impl(): VideoImpl {
    if (!(this.type in videoImplementations)) {
      throw new Error(`Could not find video implementation for type ${this.type}. Please specify a valid video type.`);
    }

    return videoImplementations[this.type];
  }

  private get posterImageUrl(): string {
    return this._api(this.impl.getPosterImageApiEndpoint(this.videoId));
  }

  private get _posterImageMode(): string {
    return this.posterImageMode || Vue._embettyVueOptions.posterImageMode || 'cover';
  }
}
</script>
