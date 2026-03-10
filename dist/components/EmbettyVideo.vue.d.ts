import { VideoImpl } from '../types';
declare const _default: import('vue').DefineComponent<{
    width: import('vue-ts-types/dist/types').DefaultPropOptions<number | null>;
    height: import('vue-ts-types/dist/types').DefaultPropOptions<number | null>;
    type: import('vue-ts-types/dist/types').RequiredPropOptions<string>;
    videoId: import('vue-ts-types/dist/types').RequiredPropOptions<string>;
    /** The number of seconds (or a string in the format `XXhXXmXXs`) to start playback after. */
    startAt: import('vue-ts-types/dist/types').DefaultPropOptions<string | number>;
    posterImageMode: import('vue-ts-types/dist/types').DefaultPropOptions<string | null>;
}, {}, {
    activated: boolean;
}, {
    /**
     * @returns The video implementation, based on the video type.
     * @throws If there is no video implementation for the given type.
     */
    impl(): VideoImpl;
    /**
     * @returns The embetty-server URL for the video poster image.
     */
    posterImageUrl(): string | undefined;
    /**
     * @returns The poster image mode.
     */
    _posterImageMode(): string;
    /**
     * @returns The number of seconds the video should start at.
     */
    _startAt(): number;
    /**
     * @override
     * @returns The embetty-server URL to fetch video data from, or undefined
     *          if this video does not require additional data.
     */
    url(): string | undefined;
    /**
     * @returns The HTML for the `<iframe>` this component renders upon activating.
     */
    iframe(): string;
}, {
    /**
     * Activates the video, i.e. replaces the poster image and play button with the iframe.
     */
    activate(): void;
}, import('vue').ComponentOptionsMixin, import('vue').DefineComponent<{
    serverUrl: import('vue-ts-types/dist/types').DefaultPropOptions<string | null>;
}, {}, {
    embettyLogo: string;
    fetched: boolean;
    data: Record<string, unknown> | undefined;
}, {
    url(): string | undefined;
    _serverUrl(): string;
}, {
    fetchData(): Promise<void>;
    _api(apiEndpoint: string | undefined): string | undefined;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, Readonly<import('vue').ExtractPropTypes<{
    serverUrl: import('vue-ts-types/dist/types').DefaultPropOptions<string | null>;
}>>, {
    serverUrl: string | null;
}>, {}, string, Readonly<import('vue').ExtractPropTypes<{
    width: import('vue-ts-types/dist/types').DefaultPropOptions<number | null>;
    height: import('vue-ts-types/dist/types').DefaultPropOptions<number | null>;
    type: import('vue-ts-types/dist/types').RequiredPropOptions<string>;
    videoId: import('vue-ts-types/dist/types').RequiredPropOptions<string>;
    /** The number of seconds (or a string in the format `XXhXXmXXs`) to start playback after. */
    startAt: import('vue-ts-types/dist/types').DefaultPropOptions<string | number>;
    posterImageMode: import('vue-ts-types/dist/types').DefaultPropOptions<string | null>;
}>>, {
    height: number | null;
    width: number | null;
    startAt: string | number;
    posterImageMode: string | null;
}>;
export default _default;
