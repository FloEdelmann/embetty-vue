import VideoData from '@/interfaces/VideoData';
import VideoImpl from '@/interfaces/VideoImpl';

const YoutubeVideo: VideoImpl = {
  getVideoDataApiEndpoint(videoId: string) {
    return undefined;
  },

  getPosterImageApiEndpoint(videoId: string) {
    return `/video/youtube/${videoId}-poster-image`;
  },

  getIframe(videoData: VideoData) {
    return `
      <div class="wrapper">
        <iframe
          id="ytplayer"
          type="text/html"
          width="${videoData.width}"
          height="${videoData.height}"
          src="//www.youtube-nocookie.com/embed/${videoData.videoId}?autoplay=1&start=${videoData.startAt}"
          frameborder="0"
        ></iframe>
      </div>
    `;
  }
};

export default YoutubeVideo;
