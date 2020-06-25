<template>
  <div>
    <chat-widget
      :youtube-settings="youtubeSettings"
      :test-mode="false"
    ></chat-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ChatWidget from './Followers.vue'
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
