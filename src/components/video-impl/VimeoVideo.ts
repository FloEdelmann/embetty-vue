import type { VideoData, VideoImpl } from '../../types';

const VimeoVideo: VideoImpl = {
  getVideoDataApiEndpoint(_videoId: string): undefined {
    return undefined;
  },

  getPosterImageApiEndpoint(videoId: string): string {
    return `/video/vimeo/${videoId}-poster-image`;
  },

  getIframe(videoData: VideoData): string {
    const src = `https://player.vimeo.com/video/${videoData.videoId}?autoplay=1#t=${videoData.startAt}`;
    return `<iframe src="${src}" width="${videoData.width}" height="${videoData.height}" ` +
      'frameborder="0" webkitallowfullscreen mozallowfullscreen msallowfullscreen allowfullscreen></iframe>';
  }
};

export default VimeoVideo;
