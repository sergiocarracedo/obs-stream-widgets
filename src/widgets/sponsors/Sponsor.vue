<template>
  <div class="sponsor">
     {{ sponsor.name }}
    <img :src="sponsor.logoSrc" :alt="sponsor.name" />
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
