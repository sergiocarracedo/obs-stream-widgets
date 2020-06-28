<template>
  <talk-widget
    :talk="talk"
    :mode="mode"
  ></talk-widget>
</template>
<script lang="ts">
import Vue from 'vue'
import TalkWidget from './Talk.vue'
import { Talk as TalkType } from './types'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('talks')

export default Vue.extend({
  name: 'talk-view',
  components: {
    TalkWidget
  },
  computed: {
    ...mapState([
      'talks',
      'selectedTalk'
    ]),
    talk (): TalkType {
      const params = new URLSearchParams(window.location.search)
      const talk = +params.get('talk')!

      return this.talks[talk || this.selectedTalk]
    },
    mode (): string {
      const params = new URLSearchParams(window.location.search)
      return params.get('mode') || ''
    }
  }
})
</script>
