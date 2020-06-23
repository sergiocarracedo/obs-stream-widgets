<template>
  <div>
    <countdown-widget
      :target="targetDate"
      :text-before="textBefore"
      :text-after="textAfter"
      :color="primaryColor"
      :trackColor="primaryLightColor"
    ></countdown-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CountdownWidget from './Countdown.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('countdown')
const themeHelpers = createNamespacedHelpers('theme')
const mapStateTheme = themeHelpers.mapState

export default Vue.extend({
  name: 'countdown-view',
  components: {
    CountdownWidget
  },
  computed: {
    ...mapState([
      'targetDate',
      'textAfter',
      'textBefore'
    ]),
    ...mapStateTheme({
      primaryColor: 'primary',
      primaryLightColor: 'primaryLight'
    })
  }
})
</script>
