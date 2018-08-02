/** @type VideoImpl */
const FacebookVideo = {
  /**
   * @param {!string} videoId The ID of the video.
   * @returns {?string} The embetty-server API endpoint to get the video data from.
   */
  getVideoDataApiEndpoint(videoId) {
    return `/video/facebook/${videoId}`;
  },

  /**
   * @param {!string} videoId The ID of the video.
   * @returns {!string} The embetty-server API endpoint to get the poster image from.
   */
  getPosterImageApiEndpoint(videoId) {
    return `/video/facebook/${videoId}-poster-image`;
  },

  /**
   * @param {!VideoData} videoData All data required to render the video iframe.
   * @returns {!string} The <iframe> playing the video.
   */
  getIframe(videoData) {
    const canonicalUrl = encodeURIComponent(videoData.serverData.canonicalUrl);
    const iframeSrc = `https://www.facebook.com/plugins/video.php?href=${canonicalUrl}` +
      `&show_text=0&autoplay=1&mute=0&width=${videoData.width}`;

    return `<iframe
      src="${iframeSrc}"
      width="${videoData.width}"
      height="${videoData.height}"
      style="border:none;overflow:hidden"
      scrolling="no"
      frameborder="0"
      allowTransparency="true"
      allowFullScreen="true"></iframe>`;
  }
};

export default FacebookVideo;
