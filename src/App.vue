<template>
  <component :is="layout"></component>
</template>

<script lang="ts">
import Vue from 'vue'
import DefaultLayout from './layouts/Default.vue'
import SettingsLayout from './layouts/Settings.vue'
export default Vue.extend({
  name: 'App',
  components: {
    DefaultLayout,
    SettingsLayout
  },
  computed: {
    layout () {
      if (this.$route.meta && this.$route.meta.layout) {
        return `${this.$route.meta.layout}-layout`
      }
      return 'default-layout'
    }
  }
})
</script>
