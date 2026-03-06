export interface EmbettyVueOptions {
  serverUrl?: string;
  posterImageMode?: string;
}

export interface VideoData {
  width: number;
  height: number;
  videoId: string;
  startAt: number;
  serverData: Record<string, unknown> | undefined;
}

export interface VideoImpl {
  getVideoDataApiEndpoint(videoId: string): string | undefined;
  getPosterImageApiEndpoint(videoId: string): string | undefined;
  getIframe(videoData: VideoData): string;
}
