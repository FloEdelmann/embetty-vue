import FacebookVideo from '@/components/video-impl/FacebookVideo';
import VimeoVideo from '@/components/video-impl/VimeoVideo';
import YoutubeVideo from '@/components/video-impl/YoutubeVideo';

export var videoImplementations = {
  facebook: FacebookVideo,
  vimeo: VimeoVideo,
  youtube: YoutubeVideo
};
