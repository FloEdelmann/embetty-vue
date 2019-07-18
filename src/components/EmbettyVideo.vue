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

<script>
import EmbettyEmbed from './EmbettyEmbed.vue';

import { videoImplementations } from './video-impl/index';

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
      validator: function(videoType) {
        return videoType in videoImplementations;
      }
    },
    videoId: {
      type: String,
      required: true,
      /**
       * @param {!string} videoId The ID of the video.
       * @returns {!boolean} True if it seems like a valid video ID, false otherwise.
       */
      validator: function(videoId) {
        return /^[a-zA-Z0-9_-]{6,}$/.test(videoId) || videoId.startsWith('http');
      }
    },
    startAt: {
      type: [Number, String],
      required: false,
      default: 0,
      /**
       * @param {!number} startAt The number of seconds to start playback after.
       * @returns {!boolean} True if it is a non-negative integer, false otherwise.
       */
      validator: function(startAt) {
        if (typeof startAt === 'number') {
          return startAt % 1 === 0 && startAt >= 0;
        }

        return /^(?:(?:\d+h)?\d+m)?\d+s?$/.test(startAt);
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
  data: function() {
    return {
      activated: false
    };
  },
  computed: {
    /**
     * @returns {!VideoImpl} The video implementation, based on the video type.
     * @throws {!Error} If there is no video implementation for the given type.
     */
    impl: function() {
      if (!(this.type in videoImplementations)) {
        throw new Error('Could not find video implementation for type ' + this.type + '. Please specify a valid video type.');
      }

      return videoImplementations[this.type];
    },

    /**
     * @returns {!string} The embetty-server URL for the video poster image.
     */
    posterImageUrl: function() {
      return this._api(this.impl.getPosterImageApiEndpoint(this.videoId));
    },

    /**
     * @returns {!string} The poster image mode.
     */
    _posterImageMode: function() {
      return this.posterImageMode || this._embettyVueOptions.posterImageMode || 'cover';
    },

    /**
     * @returns {!number} The number of seconds the video should start at.
     */
    _startAt: function() {
      if (typeof this.startAt === 'number') {
        return this.startAt;
      }

      var timeRegex = /^(?:(?:(\d+)h)?(\d+)m)?(\d+)s?$/;
      var timeMatch = this.startAt.match(timeRegex);

      if (timeMatch) {
        // '1m16s'    -> timeMatch = ['1m16s',    undefined, '1', '16']
        // '1h23m45s' -> timeMatch = ['1h23m45s', '1',       '2', '34']
        var timeNumbers = timeMatch.map(function(val) {
          if (val === undefined) {
            return 0;
          }
          return parseInt(val);
        });

        var hours = timeNumbers[1];
        var minutes = timeNumbers[2];
        var seconds = timeNumbers[3];

        return (hours * 3600) + (minutes * 60) + seconds;
      }

      return 0;
    },

    /**
     * @override
     * @returns {?string} The embetty-server URL to fetch video data from, or undefined
     *                    if this video does not require additional data.
     */
    url: function() {
      return this._api(this.impl.getVideoDataApiEndpoint(this.videoId));
    },

    /**
     * @returns {!string} The HTML for the <iframe> this component renders upon activating.
     */
    iframe: function() {
      return this.impl.getIframe({
        width: this.width || 1600,
        height: this.height || 900,
        videoId: this.videoId,
        startAt: this._startAt,
        serverData: this.data
      });
    }
  },
  methods: {
    /**
     * Activates the video, i.e. replaces the poster image and play button with the iframe.
     */
    activate: function() {
      this.activated = true;
      this.$emit('activated');
    }
  }
};
</script>
