<template>
  <div class="embetty-video">
    This is a {{ type }} video with ID {{ videoId }} and width {{ width }}.
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { EmbettyVideoTypes } from '@/enums/EmbettyVideoTypes';
import EmbettyEmbed from '@/components/EmbettyEmbed.vue';

@Component
export default class EmbettyVideo extends EmbettyEmbed {
  @Prop({
    type: String,
    required: true,
    validator(videoType: string) {
      return Object.keys(EmbettyVideoTypes).includes(videoType);
    }
  })
  private type!: string;

  @Prop({
    type: String,
    required: true,
    validator(videoId: string) {
      return /^[a-zA-Z0-9_-]{6,}$/.test(videoId);
    }
  })
  private videoId!: string;

  @Prop({
    type: Number,
    required: false,
    default: 0,
    validator(startAt: number) {
      return startAt % 1 === 0;
    }
  })
  private startAt?: number;
}
</script>
