import VideoData from '@/interfaces/VideoData';
import VideoImpl from '@/interfaces/VideoImpl';

const FacebookVideo: VideoImpl = {
  getVideoDataApiEndpoint(videoId: string) {
    return `/video/facebook/${videoId}`;
  },

  getPosterImageApiEndpoint(videoId: string) {
    return `/video/facebook/${videoId}-poster-image`;
  },

  getIframe(videoData: VideoData) {
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
