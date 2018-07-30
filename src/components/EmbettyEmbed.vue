<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// eslint-disable-next-line
const EMBETTY_LOGO = require('!raw-loader!@/assets/embetty.svg').toString();

@Component
export default class EmbettyEmbed extends Vue {
  @Prop({
    type: Number,
    required: false,
    default: 1600
  })
  protected width!: number;

  @Prop({
    type: Number,
    required: false,
    default: 900
  })
  protected height!: number;

  @Prop({
    type: String,
    required: false,
    default: null
  })
  protected serverUrl!: string;


  protected embettyLogo: string = EMBETTY_LOGO;

  protected fetched: boolean = false;
  protected data?: object = undefined;


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


  protected async fetchData() {
    const response = await window.fetch(this.url);
    this.data = await response.json();
    this.fetched = true;
  }

  protected _api(url: string) {
    return this._serverUrl + url;
  }

  @Watch('url', {
    immediate: true
  })
  protected async onUrlChanged(url?: string) {
    if (url) {
      await this.fetchData();
      this.$nextTick(() => this.$emit('initialized'));
    }
  }
}
</script>
