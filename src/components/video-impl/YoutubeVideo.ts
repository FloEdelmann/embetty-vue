import type { VideoData, VideoImpl } from '../../types';

const YoutubeVideo: VideoImpl = {
  getVideoDataApiEndpoint(_videoId: string): undefined {
    return undefined;
  },

  getPosterImageApiEndpoint(videoId: string): string {
    return `/video/youtube/${videoId}-poster-image`;
  },

  getIframe(videoData: VideoData): string {
    const src = `https://www.youtube-nocookie.com/embed/${videoData.videoId}?autoplay=1&start=${videoData.startAt}`;
    return `<iframe src="${src}" width="${videoData.width}" height="${videoData.height}" ` +
      'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ' +
      'webkitallowfullscreen mozallowfullscreen msallowfullscreen allowfullscreen></iframe>';
  }
};

export default YoutubeVideo;
