/** @type VideoImpl */
var NativeVideo = {
  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} undefined because no additional video data are required for native videos.
   */
  getVideoDataApiEndpoint: function(videoId) {
    return undefined;
  },

  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} undefined because poster images for native videos are not yet supported by the server.
   */
  getPosterImageApiEndpoint: function(videoId) {
    return undefined;
  },

  /**
   * @param {!VideoData} videoData All data required to render the video element.
   * @returns {!string} The <video> element playing the video.
   */
  getIframe: function(videoData) {
    return '<video width="' + videoData.width + '" height="' + videoData.height + '" autoplay controls>' +
      '<source src="' + videoData.videoId + '" />' +
      '</video>';
  }
};

export default NativeVideo;
