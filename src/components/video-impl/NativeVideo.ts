import type { VideoData, VideoImpl } from '../../types';

const NativeVideo: VideoImpl = {
  getVideoDataApiEndpoint(_videoId: string): undefined {
    return undefined;
  },

  getPosterImageApiEndpoint(_videoId: string): undefined {
    return undefined;
  },

  getIframe(videoData: VideoData): string {
    return `<video width="${videoData.width}" height="${videoData.height}" autoplay controls><source src="${videoData.videoId}" /></video>`;
  }
};

export default NativeVideo;
