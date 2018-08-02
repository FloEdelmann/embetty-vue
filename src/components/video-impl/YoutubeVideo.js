/** @type VideoImpl */
const YoutubeVideo = {
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
    return `/video/youtube/${videoId}-poster-image`;
  },

  /**
   * @param {VideoData} videoData
   * @returns {string}
   */
  getIframe(videoData) {
    return `<iframe
      type="text/html"
      width="${videoData.width}"
      height="${videoData.height}"
      src="//www.youtube-nocookie.com/embed/${videoData.videoId}?autoplay=1&start=${videoData.startAt}"
      frameborder="0"></iframe>`;
  }
};

export default YoutubeVideo;
