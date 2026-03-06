<script lang="ts">
import { defineComponent } from 'vue';
import EMBETTY_LOGO from '../assets/embetty.svg?raw';

export default defineComponent({
  name: 'EmbettyEmbed',
  props: {
    serverUrl: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      embettyLogo: EMBETTY_LOGO as string,

      fetched: false,
      data: undefined as Record<string, unknown> | undefined
    };
  },
  computed: {
    /** Override this in child components! */
    url(): string | undefined {
      return undefined;
    },

    /** The server URL, either from this component's prop or the global config. */
    _serverUrl(): string {
      if (this.serverUrl) {
        return this.serverUrl;
      }

      if (!this._embettyVueOptions.serverUrl) {
        throw new Error(`serverUrl is neither set directly on the ${(this.$vnode as { tag?: string }).tag} component nor globally.`);
      }

      return this._embettyVueOptions.serverUrl;
    }
  },
  watch: {
    url: {
      immediate: true,
      handler(url: string | undefined) {
        if (url) {
          this.fetchData();
        }
      }
    }
  },
  methods: {
    /** Calls the API of embetty-server using the url set in the calling (child) component. */
    async fetchData(): Promise<void> {
      // skip fetching in SSR
      if (typeof window === 'undefined') {
        return;
      }

      const response = await window.fetch(this.url);
      this.data = await response.json() as Record<string, unknown>;
      this.fetched = true;
    },

    /**
     * Returns the given API endpoint URL, prepended with the embetty-server base URL,
     * or undefined if no endpoint is given.
     */
    _api(apiEndpoint: string | undefined): string | undefined {
      return apiEndpoint ? (this._serverUrl + apiEndpoint) : undefined;
    }
  }
});
</script>
