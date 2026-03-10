declare const _default: import('vue').DefineComponent<{
    serverUrl: import('vue-ts-types/dist/types').DefaultPropOptions<string | null>;
}, {}, {
    embettyLogo: string;
    fetched: boolean;
    data: Record<string, unknown> | undefined;
}, {
    /**
     * Override this in child components!
     * @returns The URL to query for data in this component.
     */
    url(): string | undefined;
    /**
     * @returns The server URL, either from this component's prop or the global config.
     */
    _serverUrl(): string;
}, {
    /**
     * Calls the API of embetty-server using the url set in the calling (child) component.
     */
    fetchData(): Promise<void>;
    /**
     * @param apiEndpoint The API endpoint of the embetty-server.
     * @returns The given URL, prepended with the embetty-server base URL.
     */
    _api(apiEndpoint: string | undefined): string | undefined;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, Readonly<import('vue').ExtractPropTypes<{
    serverUrl: import('vue-ts-types/dist/types').DefaultPropOptions<string | null>;
}>>, {
    serverUrl: string | null;
}>;
export default _default;
