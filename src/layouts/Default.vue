<template>
  <router-view />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'default-layout',
  beforeMount (): void {
    document.getElementsByTagName('html')[0].classList.add('widget-wrapper')
  }

})
</script>
