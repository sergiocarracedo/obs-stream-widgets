<template>
  <div>
    <chat-widget
      :youtube-settings="youtube"
      :twitch-settings="twitch"
      :platform="platform"
      :test-mode="false"
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
      'youtube',
      'twitch',
      'platform'
    ])
  }
})
</script>
