<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// tslint:disable-next-line
const EMBETTY_LOGO = require('!raw-loader!@/assets/embetty.svg').toString();

@Component
export default class EmbettyEmbed extends Vue {
  @Prop({
    type: String,
    required: false,
    default: null
  })
  protected serverUrl!: string;


  protected embettyLogo: string = EMBETTY_LOGO;

  protected fetched: boolean = false;
  protected data?: any = undefined;


  // override in child components
  protected get url(): string | undefined {
    return undefined;
  }

  protected get _serverUrl(): string {
    if (this.serverUrl) {
      return this.serverUrl;
    }

    if (!Vue._embettyVueOptions.serverUrl) {
      throw new Error(`serverUrl is neither set directely on the ${this.$vnode.tag} component nor globally.`);
    }

    return Vue._embettyVueOptions.serverUrl;
  }


  @Watch('url', {
    immediate: true
  })
  protected async onUrlChanged(url?: string) {
    if (url) {
      await this.fetchData();
    }
  }


  protected async fetchData() {
    const response = await window.fetch(this.url);
    this.data = await response.json();
    this.fetched = true;
  }

  protected _api(url?: string): string | undefined {
    return url ? `${this._serverUrl}${url}` : undefined;
  }
}
</script>
