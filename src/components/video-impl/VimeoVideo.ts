import VideoData from '@/interfaces/VideoData';
import VideoImpl from '@/interfaces/VideoImpl';

const VimeoVideo: VideoImpl = {
  getVideoDataApiEndpoint(videoId: string) {
    return undefined;
  },

  getPosterImageApiEndpoint(videoId: string) {
    return `/video/vimeo/${videoId}-poster-image`;
  },

  getIframe(videoData: VideoData) {
    return `
      <div class="wrapper">
        <iframe
          src="https://player.vimeo.com/video/${videoData.videoId}?autoplay=1#t=${videoData.startAt}"
          width="${videoData.width}"
          height="${videoData.height}"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        ></iframe>
      </div>
    `;
  }
};

export default VimeoVideo;
