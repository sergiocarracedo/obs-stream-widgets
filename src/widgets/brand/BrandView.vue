<template>
  <div>
    <brand-widget
      :logo="logo"
    ></brand-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import BrandWidget from './Brand.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('brand')

export default Vue.extend({
  name: 'countdown-view',
  components: {
    BrandWidget
  },
  computed: {
    ...mapState([
      'logo'
    ])
  }
})
</script>
