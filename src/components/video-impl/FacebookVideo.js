/** @type VideoImpl */
var FacebookVideo = {
  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} The embetty-server API endpoint to get the video data from.
   */
  getVideoDataApiEndpoint: function(videoId) {
    return '/video/facebook/' + videoId;
  },

  /**
   * @param {!string} videoId The ID of the video.
   * @returns {!string} The embetty-server API endpoint to get the poster image from.
   */
  getPosterImageApiEndpoint: function(videoId) {
    return '/video/facebook/' + videoId + '-poster-image';
  },

  /**
   * @param {!VideoData} videoData All data required to render the video iframe.
   * @returns {!string} The <iframe> playing the video.
   */
  getIframe: function(videoData) {
    var canonicalUrl = encodeURIComponent(videoData.serverData.canonicalUrl);
    var iframeSrc = 'https://www.facebook.com/plugins/video.php?href=' + canonicalUrl +
      '&show_text=0&autoplay=1&mute=0&width=' + videoData.width;

    return '<iframe ' +
      'src="' + iframeSrc + '" ' +
      'width="' + videoData.width + '" ' +
      'height="' + videoData.height + '" ' +
      'frameborder="0" ' +
      'webkitallowfullscreen ' +
      'mozallowfullscreen ' +
      'msallowfullscreen ' +
      'allowfullscreen></iframe>';
  }
};

export default FacebookVideo;
