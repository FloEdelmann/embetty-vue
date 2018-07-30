import FacebookVideo from '@/components/video-impl/FacebookVideo';
import VimeoVideo from '@/components/video-impl/VimeoVideo';
import YoutubeVideo from '@/components/video-impl/YoutubeVideo';
import VideoImpl from '@/interfaces/VideoImpl';

declare interface VideoImplementations {
  [s: string]: VideoImpl;
}

export const videoImplementations: VideoImplementations = {
  FacebookVideo,
  VimeoVideo,
  YoutubeVideo
};
