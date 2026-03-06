/** @type VideoImpl */
const NativeVideo = {
  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} undefined because no additional video data are required for native videos.
   */
  getVideoDataApiEndpoint(videoId) {
    return undefined;
  },

  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} undefined because poster images for native videos are not yet supported by the server.
   */
  getPosterImageApiEndpoint(videoId) {
    return undefined;
  },

  /**
   * @param {!VideoData} videoData All data required to render the video element.
   * @returns {!string} The <video> element playing the video.
   */
  getIframe(videoData) {
    return `<video width="${videoData.width}" height="${videoData.height}" autoplay controls><source src="${videoData.videoId}" /></video>`;
  }
};

export default NativeVideo;
