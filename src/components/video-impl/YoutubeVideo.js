/** @type VideoImpl */
var YoutubeVideo = {
  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} undefined because no additional video data are required for YouTube.
   */
  getVideoDataApiEndpoint: function(videoId) {
    return undefined;
  },

  /**
   * @param {!string} videoId The ID of the video.
   * @returns {!string} The embetty-server API endpoint to get the poster image from.
   */
  getPosterImageApiEndpoint: function(videoId) {
    return '/video/youtube/' + videoId + '-poster-image';
  },

  /**
   * @param {!VideoData} videoData All data required to render the video iframe.
   * @returns {!string} The <iframe> playing the video.
   */
  getIframe: function(videoData) {
    return '<iframe ' +
      'src="https://www.youtube-nocookie.com/embed/' + videoData.videoId + '?autoplay=1&start=' + videoData.startAt + '" ' +
      'width="' + videoData.width + '" ' +
      'height="' + videoData.height + '" ' +
      'frameborder="0" ' +
      'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"' +
      'webkitallowfullscreen ' +
      'mozallowfullscreen ' +
      'msallowfullscreen ' +
      'allowfullscreen></iframe>';
  }
};

export default YoutubeVideo;
