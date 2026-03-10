interface TweetMedia {
    url: string;
    imageUrl: string;
}
interface TweetLink {
    url: string;
    description?: string;
    title: string;
}
interface TweetData {
    user: {
        name: string;
        screen_name: string;
    };
    full_text: string;
    extended_entities?: {
        media?: TweetMedia[];
    };
    entities: {
        urls?: TweetLink[];
    };
    created_at: string;
    id_str: string;
    in_reply_to_status_id_str: string | null;
}
declare const _default: import('vue').DefineComponent<{
    status: import('vue-ts-types/dist/types').RequiredPropOptions<string>;
    answered: import('vue-ts-types/dist/types').DefaultPropOptions<boolean>;
}, {}, {
    linkDescription: string | null;
}, {
    /**
     * @returns The raw tweet data cast to TweetData.
     */
    tweetData(): TweetData;
    /**
     * @override
     * @returns The embetty-server URL to query for this tweet's data.
     */
    url(): string;
    /**
     * @returns The name of this tweet's user.
     */
    userName(): string;
    /**
     * @returns The twitter handle of this tweet's user.
     */
    screenName(): string;
    /**
     * @returns The text content of this tweet. Can contain HTML links to URLs, hashtags and at-mentions.
     */
    fullText(): string;
    /**
     * @returns An array of objects describing this tweet's attached photos.
     */
    media(): TweetMedia[];
    /**
     * @returns An array of objects describing this tweet's links.
     */
    links(): TweetLink[];
    /**
     * @returns This tweet's first link object.
     */
    link(): TweetLink | undefined;
    /**
     * @returns The embetty-server URL for this tweet's first link's image.
     */
    linkImageUrl(): string;
    /**
     * @returns The hostname of this tweet's first link's URL.
     */
    linkHostname(): string | undefined;
    /**
     * @returns The embetty-server URL for this tweet's user profile image.
     */
    profileImageUrl(): string;
    /**
     * @returns A Date object containing this tweet's creation date.
     */
    createdAt(): Date;
    /**
     * @returns The URL leading to this tweet on Twitter.
     */
    twitterUrl(): string;
    /**
     * @returns The status ID of the tweet that this tweet is a reply to, if any.
     */
    answeredTweetId(): string | null;
    /**
     * @returns Whether this is a reply to another tweet.
     */
    isReply(): boolean;
}, {
    /**
     * Truncate this tweet's first link's description to fit into the space it is given.
     */
    fitLinkDescription(): void;
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
    status: import('vue-ts-types/dist/types').RequiredPropOptions<string>;
    answered: import('vue-ts-types/dist/types').DefaultPropOptions<boolean>;
}>>, {
    answered: boolean;
}>;
export default _default;
