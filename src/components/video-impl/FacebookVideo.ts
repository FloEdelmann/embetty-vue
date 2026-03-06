import type { VideoData, VideoImpl } from '../../types';

const FacebookVideo: VideoImpl = {
  getVideoDataApiEndpoint(videoId: string): string {
    return `/video/facebook/${videoId}`;
  },

  getPosterImageApiEndpoint(videoId: string): string {
    return `/video/facebook/${videoId}-poster-image`;
  },

  getIframe(videoData: VideoData): string {
    const canonicalUrl = encodeURIComponent((videoData.serverData as { canonicalUrl: string }).canonicalUrl);
    const iframeSrc = `https://www.facebook.com/plugins/video.php?href=${canonicalUrl}` +
      `&show_text=0&autoplay=1&mute=0&width=${videoData.width}`;

    return `<iframe src="${iframeSrc}" width="${videoData.width}" height="${videoData.height}" ` +
      'frameborder="0" webkitallowfullscreen mozallowfullscreen msallowfullscreen allowfullscreen></iframe>';
  }
};

export default FacebookVideo;
