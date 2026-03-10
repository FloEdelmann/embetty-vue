import type { VideoData, VideoImpl } from '../../types';

const VimeoVideo: VideoImpl = {
  /**
   * @param videoId The ID of the video.
   * @returns undefined because no additional video data are required for Vimeo.
   */
  getVideoDataApiEndpoint(_videoId: string): undefined {
    return undefined;
  },

  /**
   * @param videoId The ID of the video.
   * @returns The embetty-server API endpoint to get the poster image from.
   */
  getPosterImageApiEndpoint(videoId: string): string {
    return `/video/vimeo/${videoId}-poster-image`;
  },

  /**
   * @param videoData All data required to render the video iframe.
   * @returns The `<iframe>` playing the video.
   */
  getIframe(videoData: VideoData): string {
    const src = `https://player.vimeo.com/video/${videoData.videoId}?autoplay=1#t=${videoData.startAt}`;
    return `<iframe src="${src}" width="${videoData.width}" height="${videoData.height}" ` +
      'frameborder="0" webkitallowfullscreen mozallowfullscreen msallowfullscreen allowfullscreen></iframe>';
  }
};

export default VimeoVideo;
