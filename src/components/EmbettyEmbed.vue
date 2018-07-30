<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// eslint-disable-next-line
const EMBETTY_LOGO = require('!raw-loader!@/assets/embetty.svg').toString();

@Component
export default class EmbettyEmbed extends Vue {
  protected embettyLogo: string = EMBETTY_LOGO;

  protected fetched: boolean = false;
  protected data?: object = undefined;

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

  // override in child components
  protected get url(): string | undefined {
    return undefined;
  }

  protected async fetchData() {
    const response = await window.fetch(this.url);
    this.data = await response.json();
    this.fetched = true;
  }

  @Watch('url', {
    immediate: true
  })
  async onUrlChanged() {
    if (this.url) {
      await this.fetchData();
      this.$emit('initialized');
    }
  }
}
</script>
