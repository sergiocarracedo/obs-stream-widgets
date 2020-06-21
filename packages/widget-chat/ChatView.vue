<template>
  <div>
    <chat-widget
      :youtube-settings="youtubeSettings"
      :test-mode="true"
    ></chat-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ChatWidget from './Chat.vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'countdown-view',
  components: {
    ChatWidget
  },
  computed: {
    ...mapState([
      'youtubeSettings'
    ])
  }
})
</script>
