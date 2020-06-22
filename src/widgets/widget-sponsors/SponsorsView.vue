<template>
  <div>
    <sponsors-widget
      :sponsors="sponsors"
    ></sponsors-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SponsorsWidget from './Sponsors.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('sponsors')

export default Vue.extend({
  name: 'countdown-view',
  components: {
    SponsorsWidget
  },
  computed: {
    ...mapState([
      'sponsors'
    ])
  }
})
</script>
