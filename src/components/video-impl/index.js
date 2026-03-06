import FacebookVideo from './FacebookVideo';
import NativeVideo from './NativeVideo';
import VimeoVideo from './VimeoVideo';
import YoutubeVideo from './YoutubeVideo';

export const videoImplementations = {
  facebook: FacebookVideo,
  native: NativeVideo,
  vimeo: VimeoVideo,
  youtube: YoutubeVideo
};
