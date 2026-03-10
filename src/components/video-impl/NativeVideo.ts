import type { VideoData, VideoImpl } from '../../types';

const NativeVideo: VideoImpl = {
  /**
   * @param videoId The ID of the video.
   * @returns undefined because no additional video data are required for native videos.
   */
  getVideoDataApiEndpoint(_videoId: string): undefined {
    return undefined;
  },

  /**
   * @param videoId The ID of the video.
   * @returns undefined because poster images for native videos are not yet supported by the server.
   */
  getPosterImageApiEndpoint(_videoId: string): undefined {
    return undefined;
  },

  /**
   * @param videoData All data required to render the video element.
   * @returns The `<video>` element playing the video.
   */
  getIframe(videoData: VideoData): string {
    return `<video width="${videoData.width}" height="${videoData.height}" autoplay controls><source src="${videoData.videoId}" /></video>`;
  }
};

export default NativeVideo;
