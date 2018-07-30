import VideoData from '@/interfaces/VideoData';

export default interface VideoImpl {
  getVideoDataApiEndpoint(videoId: string): string | undefined;
  getPosterImageApiEndpoint(videoId: string): string;
  getIframe(videoData: VideoData): string;
}
