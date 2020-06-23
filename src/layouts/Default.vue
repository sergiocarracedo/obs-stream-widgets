<template>
  <div>
    <theme-styles></theme-styles>
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ThemeStyles from '@/components/ThemeStyles.vue'

export default Vue.extend({
  name: 'default-layout',
  components: {
    ThemeStyles
  },
  beforeMount (): void {
    document.getElementsByTagName('html')[0].classList.add('widget-wrapper')
  }

})
</script>
