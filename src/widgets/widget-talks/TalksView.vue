<template>
  <div>
    <talks
      v-if="cycle"
      :talks="talks"
      :mode="mode"
      :timeout="5000"
    ></talks>
    <talk-widget
      v-else
      :talk="talk"
      :mode="mode"
    ></talk-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import TalkWidget from './Talk.vue'
import Talks from './Talks.vue'
import { Talk as TalkType } from './types'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('talks')

export default Vue.extend({
  name: 'talk-view',
  components: {
    TalkWidget,
    Talks
  },
  computed: {
    ...mapState([
      'talks',
      'selectedTalk'
    ]),
    talk (): TalkType[] {
      const params = new URLSearchParams(window.location.search)
      const talk = +params.get('talk')!
      return this.talks[talk || this.selectedTalk || 0]
    },
    mode (): string {
      const params = new URLSearchParams(window.location.search)
      return params.get('mode') || ''
    },
    cycle (): boolean {
      const params = new URLSearchParams(window.location.search)
      const cycle = params.get('cycle')
      return cycle !== null
    }
  }
})
</script>
