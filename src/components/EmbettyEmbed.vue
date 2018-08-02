<script>
// eslint-disable-next-line
const EMBETTY_LOGO = require('!raw-loader!@/assets/embetty.svg').toString();

export default {
  name: 'embetty-embed',
  props: {
    serverUrl: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      embettyLogo: EMBETTY_LOGO,

      fetched: false,
      data: undefined
    };
  },
  computed: {
    /**
     * Override this in child components!
     * @returns {string | undefined}
     */
    url() {
      return undefined;
    },

    /**
     * @returns {!string}
     */
    _serverUrl() {
      if (this.serverUrl) {
        return this.serverUrl;
      }

      if (!this._embettyVueOptions.serverUrl) {
        throw new Error(`serverUrl is neither set directly on the ${this.$vnode.tag} component nor globally.`);
      }

      return this._embettyVueOptions.serverUrl;
    }
  },
  watch: {
    url: {
      immediate: true,
      handler(url) {
        if (url) {
          this.fetchData();
        }
      }
    }
  },
  methods: {
    /**
     * Calls the API of embetty-server using the url set in the calling (child) component.
     */
    async fetchData() {
      const response = await window.fetch(this.url);
      this.data = await response.json();
      this.fetched = true;
    },

    /**
     * @param {?string} url
     * @returns {?string} The given URL, prepended with the embetty-server base URL.
     */
    _api(url) {
      return url ? `${this._serverUrl}${url}` : undefined;
    }
  }
}
</script>
