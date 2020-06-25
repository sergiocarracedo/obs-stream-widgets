<template>
  <div>
    <talk-widget
      :talk="talk"
    ></talk-widget>
  </div>
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
      return this.talks[params.get('talk') || this.selectedTalk]
    }
  }
})
</script>
