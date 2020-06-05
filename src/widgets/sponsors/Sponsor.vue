<template>
  <div class="sponsor">
    <img :src="sponsor.logo" :alt="sponsor.name" />
  </div>
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
