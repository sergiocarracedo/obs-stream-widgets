<template>
  <sponsors-widget
    :sponsors="sponsors"
  ></sponsors-widget>
</template>
<script lang="ts">
import Vue from 'vue'
import SponsorsWidget from './Sponsor.vue'
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
