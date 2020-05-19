<template>
  <countdown-widget
    :target="targetDate"
    :text-before="textBefore"
    :text-after="textAfter"
    :color="clockColor"
    :track-color="clockTrackColor"
  ></countdown-widget>
</template>
<script lang="ts">
import Vue from 'vue'
import CountdownWidget from './Countdown.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('countdown')

export default Vue.extend({
  name: 'countdown-view',
  components: {
    CountdownWidget
  },
  computed: {
    ...mapState(['targetDate', 'textAfter', 'textBefore', 'clockColor', 'clockTrackColor'])
  },
  mounted () {
    console.log('mounted')
  }

})
</script>
