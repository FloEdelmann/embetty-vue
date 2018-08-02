<template>
  <div :style="{ 'width': width === null ? null : `${width}px` }" class="embetty-video">
    <div
      v-if="activated"
      :class="{
        'wrapper': true,
        'default-height': height === null
      }"
      :style="{
        'height': height === null ? null : `${height}px`
      }"
      v-html="iframe" />
    <template v-else>
      <button type="button" class="playbutton" @click="activate">
        <svg viewBox="0 0 200 200" class="playicon">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke-width="15"
            stroke="#fff" />
          <polygon points="70, 55 70, 145 145, 100" fill="#fff" />
        </svg>
      </button>
      <div
        :class="{
          'poster': true,
          'default-height': height === null,
          'contain': posterImageMode === 'contain'
        }"
        :style="{
          'backgroundImage': posterImageUrl ? `url(${posterImageUrl})`: null,
          'height': height === null ? null : `${height}px`
      }" />
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

<style lang="scss" scoped>
@import '@/assets/element.scss';

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

  .powered-by {
    @include powered-by();

    -webkit-font-smoothing: antialiased;

    color: #fff;
    opacity: .6;
  }
}
</style>

<style lang="scss">
.embetty-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<script>
import EmbettyEmbed from '@/components/EmbettyEmbed.vue';

import { videoImplementations } from '@/components/video-impl/index';

export default {
  name: 'EmbettyVideo',
  extends: EmbettyEmbed,
  props: {
    width: {
      type: Number,
      required: false,
      default: null
    },
    height: {
      type: Number,
      required: false,
      default: null
    },
    type: {
      type: String,
      required: true,
      /**
       * @param {!string} videoType The type of the video.
       * @returns {!boolean} True if it is a valid type, false otherwise.
       */
      validator(videoType) {
        return Object.keys(videoImplementations).includes(videoType);
      }
    },
    videoId: {
      type: String,
      required: true,
      /**
       * @param {!string} videoId The ID of the video.
       * @returns {!boolean} True if it seems like a valid video ID, false otherwise.
       */
      validator(videoId) {
        return /^[a-zA-Z0-9_-]{6,}$/.test(videoId);
      }
    },
    startAt: {
      type: Number,
      required: false,
      default: 0,
      /**
       * @param {!number} startAt The number of seconds to start playback after.
       * @returns {!boolean} True if it is a non-negative integer, false otherwise.
       */
      validator(startAt) {
        return startAt % 1 === 0 && startAt >= 0;
      }
    },
    posterImageMode: {
      type: String,
      required: false,
      default: null
    }
  },
  /**
   * @returns {!object} The component's data.
   */
  data() {
    return {
      activated: false
    };
  },
  computed: {
    /**
     * @returns {!VideoImpl} The video implementation, based on the video type.
     * @throws {!Error} If there is no video implementation for the given type.
     */
    impl() {
      if (!(this.type in videoImplementations)) {
        throw new Error(`Could not find video implementation for type ${this.type}. Please specify a valid video type.`);
      }

      return videoImplementations[this.type];
    },

    /**
     * @returns {!string} The embetty-server URL for the video poster image.
     */
    posterImageUrl() {
      return this._api(this.impl.getPosterImageApiEndpoint(this.videoId));
    },

    /**
     * @returns {!string} The poster image mode.
     */
    _posterImageMode() {
      return this.posterImageMode || this._embettyVueOptions.posterImageMode || 'cover';
    },

    /**
     * @override
     * @returns {?string} The embetty-server URL to fetch video data from, or undefined
     *                    if this video does not require additional data.
     */
    url() {
      return this._api(this.impl.getVideoDataApiEndpoint(this.videoId));
    },

    /**
     * @returns {!string} The HTML for the <iframe> this component renders upon activating.
     */
    iframe() {
      return this.impl.getIframe({
        width: this.width || 1600,
        height: this.height || 900,
        videoId: this.videoId,
        startAt: this.startAt,
        serverData: this.data
      });
    }
  },
  methods: {
    /**
     * Activates the video, i.e. replaces the poster image and play button with the iframe.
     */
    activate() {
      this.activated = true;
      this.$emit(`activated`);
    }
  }
};
</script>
