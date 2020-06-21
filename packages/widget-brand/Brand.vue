<template>
  <div class="brand">
    <img v-if="logo" :src="logo" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import './Brand.scss'

export default Vue.extend({
  name: 'brand',
  props: {
    logo: String
  }
})
</script>
