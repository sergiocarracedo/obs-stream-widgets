<template>
  <div class="contest-scene-wrapper">
    <contest-scene-widget :background="background"></contest-scene-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ContestSceneWidget from './ContestScene.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('contestScene')

export default Vue.extend({
  name: 'contest-scene-view',
  components: {
    ContestSceneWidget
  },
  computed: {
    ...mapState(['background'])
  }
})
</script>
