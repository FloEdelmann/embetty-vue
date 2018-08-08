/** @type VideoImpl */
var VimeoVideo = {
  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} undefined because no additional video data are required for Vimeo.
   */
  getVideoDataApiEndpoint: function(videoId) {
    return undefined;
  },

  /**
   * @param {!string} videoId The ID of the video.
   * @returns {!string} The embetty-server API endpoint to get the poster image from.
   */
  getPosterImageApiEndpoint: function(videoId) {
    return '/video/vimeo/' + videoId + '-poster-image';
  },

  /**
   * @param {!VideoData} videoData All data required to render the video iframe.
   * @returns {!string} The <iframe> playing the video.
   */
  getIframe: function(videoData) {
    return '<iframe ' +
      'src="https://player.vimeo.com/video/' + videoData.videoId + '?autoplay=1#t=' + videoData.startAt + '" ' +
      'width="' + videoData.width + '" ' +
      'height="' + videoData.height + '" ' +
      'frameborder="0" ' +
      'webkitallowfullscreen ' +
      'mozallowfullscreen ' +
      'msallowfullscreen ' +
      'allowfullscreen></iframe>';
  }
};

export default VimeoVideo;
