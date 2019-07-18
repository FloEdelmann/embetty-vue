import FacebookVideo from './FacebookVideo';
import NativeVideo from './NativeVideo';
import VimeoVideo from './VimeoVideo';
import YoutubeVideo from './YoutubeVideo';

export var videoImplementations = {
  facebook: FacebookVideo,
  native: NativeVideo,
  vimeo: VimeoVideo,
  youtube: YoutubeVideo
};
