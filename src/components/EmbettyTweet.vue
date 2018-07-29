<template>
  <div class="embetty-video">
    This is a Twitter status with ID {{ status }}.
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import EmbettyEmbed from '@/components/EmbettyEmbed.vue';

@Component
export default class EmbettyTweet extends EmbettyEmbed {
  @Prop({
    type: String,
    required: true,
    validator(statusId: string) {
      return /^\d{6,}$/.test(statusId);
    }
  })
  private status!: string;
}
</script>
