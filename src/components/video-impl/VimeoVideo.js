/** @type VideoImpl */
const VimeoVideo = {
  /**
   * @param {!string} videoId
   * @returns {?string}
   */
  getVideoDataApiEndpoint(videoId) {
    return undefined;
  },

  /**
   * @param {!string} videoId
   * @returns {!string}
   */
  getPosterImageApiEndpoint(videoId) {
    return `/video/vimeo/${videoId}-poster-image`;
  },

  /**
   * @param {VideoData} videoData
   * @returns {string}
   */
  getIframe(videoData) {
    return `<iframe
      src="https://player.vimeo.com/video/${videoData.videoId}?autoplay=1#t=${videoData.startAt}"
      width="${videoData.width}"
      height="${videoData.height}"
      frameborder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen></iframe>
    `;
  }
};

export default VimeoVideo;
