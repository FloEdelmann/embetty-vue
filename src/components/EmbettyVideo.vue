<template>
  <div :style="width === null ? `` : `width: ${width}px`" class="embetty-video">
    <div
      v-if="activated"
      class="wrapper"
      :class="{ 'default-height': height === null }"
      :style="height === null ? `` : `height: ${height}px`"
      v-html="iframe" />
    <template v-else>
      <button type="button" class="playbutton" @click="activate">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 48 48"
          fill="#fff">
          <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z" />
        </svg>
      </button>
      <div
        :class="{
          'poster': true,
          'default-height': height === null,
          'contain': posterImageMode === 'contain'
        }"
        :style="[
          posterImageUrl ? { backgroundImage: `url(${posterImageUrl})` } : {},
          height === null ? {} : { height: `${height}px` }
      ]" />
      <a
        href="https://www.heise.de/embetty"
        target="_blank"
        rel="noopener"
        class="powered-by"
        title="embetty - displaying remote content without compromising your privacy.">
        powered by <span class="embetty-logo" v-html="embettyLogo" />
      </a>
    </template>
  </div>
</template>

<style lang="scss">
@import '../assets/element.scss';

.embetty-video {
  @include host();

  .poster, .wrapper {
    position: relative;
    overflow: hidden;
    background: no-repeat center black;
    background-size: cover;

    &.contain {
      background-size: contain;
    }

    &.default-height {
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
    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8));
    transition: opacity 150ms;

    &:hover,
    &:focus {
      opacity: 1;
    }
  }

  .powered-by {
    @include powered-by();

    -webkit-font-smoothing: antialiased;

    color: #fff;
    opacity: .6;
  }

  iframe,
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import EmbettyEmbed from './EmbettyEmbed.vue';
import { numberProp, oneOfObjectKeysProp, oneOfProp, oneOfTypesProp, stringProp } from 'vue-ts-types';

import type { VideoData, VideoImpl } from '../types';
import { videoImplementations } from './video-impl/index';

export default defineComponent({
  name: 'EmbettyVideo',
  extends: EmbettyEmbed,
  props: {
    width: numberProp().nullable,
    height: numberProp().nullable,
    type: oneOfObjectKeysProp(videoImplementations).required,
    videoId: stringProp((videoId) => {
      if (typeof videoId === 'string' && (/^[a-zA-Z0-9_-]{6,}$/.test(videoId) || videoId.startsWith('http'))) {
        return undefined;
      }

      return 'Expected a valid video ID';
    }).required,
    /** The number of seconds (or a string in the format `XXhXXmXXs`) to start playback after. */
    startAt: oneOfTypesProp<number | string>([Number, String], (startAt) => {
      if (typeof startAt === 'number') {
        if (startAt % 1 === 0 && startAt >= 0) {
          return undefined;
        }

        return 'Expected a non-negative integer';
      }

      if (typeof startAt === 'string' && /^(?:(?:\d+h)?\d+m)?\d+s?$/.test(startAt)) {
        return undefined;
      }

      return 'Expected a valid time string';
    }).withDefault(0),
    posterImageMode: oneOfProp(['cover', 'contain']).nullable
  },
  /**
   * @returns The component's data.
   */
  data() {
    return {
      activated: false
    };
  },
  computed: {
    /**
     * @returns The video implementation, based on the video type.
     * @throws If there is no video implementation for the given type.
     */
    impl(): VideoImpl {
      if (!(this.type in videoImplementations)) {
        throw new Error(`Could not find video implementation for type ${this.type}. Please specify a valid video type.`);
      }

      return videoImplementations[this.type];
    },

    /**
     * @returns The embetty-server URL for the video poster image.
     */
    posterImageUrl(): string | undefined {
      return this._api(this.impl.getPosterImageApiEndpoint(this.videoId));
    },

    /**
     * @returns The poster image mode.
     */
    _posterImageMode(): string {
      return this.posterImageMode || this._embettyVueOptions.posterImageMode || 'cover';
    },

    /**
     * @returns The number of seconds the video should start at.
     */
    _startAt(): number {
      if (typeof this.startAt === 'number') {
        return this.startAt;
      }

      const timeRegex = /^(?:(?:(\d+)h)?(\d+)m)?(\d+)s?$/;
      const timeMatch = (this.startAt as string).match(timeRegex);

      if (timeMatch) {
        // '1m16s'    -> timeMatch = ['1m16s',    undefined, '1', '16']
        // '1h23m45s' -> timeMatch = ['1h23m45s', '1',       '2', '34']
        const timeNumbers = timeMatch.map(val => val === undefined ? 0 : parseInt(val));

        const hours = timeNumbers[1];
        const minutes = timeNumbers[2];
        const seconds = timeNumbers[3];

        return (hours * 3600) + (minutes * 60) + seconds;
      }

      return 0;
    },

    /**
     * @override
     * @returns The embetty-server URL to fetch video data from, or undefined
     *          if this video does not require additional data.
     */
    url(): string | undefined {
      return this._api(this.impl.getVideoDataApiEndpoint(this.videoId));
    },

    /**
     * @returns The HTML for the `<iframe>` this component renders upon activating.
     */
    iframe(): string {
      const videoData: VideoData = {
        width: this.width || 1600,
        height: this.height || 900,
        videoId: this.videoId,
        startAt: this._startAt,
        serverData: this.data
      };
      return this.impl.getIframe(videoData);
    }
  },
  methods: {
    /**
     * Activates the video, i.e. replaces the poster image and play button with the iframe.
     */
    activate(): void {
      this.activated = true;
      this.$emit('activated');
    }
  }
});
</script>
