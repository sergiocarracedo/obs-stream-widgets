<template>
  <div class="sponsor" :style="{ 'background-image': `url(${sponsor.logo})` }"></div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Sponsor } from './types'

export default Vue.extend({
  name: 'sponsor',
  props: {
    sponsor: Object as () => Sponsor
  }
})
</script>
