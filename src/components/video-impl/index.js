import FacebookVideo from './FacebookVideo';
import VimeoVideo from './VimeoVideo';
import YoutubeVideo from './YoutubeVideo';

export var videoImplementations = {
  facebook: FacebookVideo,
  vimeo: VimeoVideo,
  youtube: YoutubeVideo
};
