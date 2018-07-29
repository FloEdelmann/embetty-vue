<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EmbettyEmbed extends Vue {
  @Prop({
    type: Number,
    required: false,
    default: 1600
  })
  private width!: number;

  @Prop({
    type: Number,
    required: false,
    default: 900
  })
  private height!: number;
}
</script>
