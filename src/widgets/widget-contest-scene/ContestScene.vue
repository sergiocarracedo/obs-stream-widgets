<template>
  <div class="contest-scene-widget container-fluid" :style="`background-image: url(${background})`">
    <div class="grid-row">
      <div class="col-xs-12 col-sm-8 scene-contest">
        <contest-widget-view></contest-widget-view>
      </div>

      <div class="col-xs-12 col-sm-4 scene-chat">
        <contest-chat-view></contest-chat-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ContestWidgetView from '../widget-contest/ContestView.vue'
import ContestChatView from '../widget-chat/ChatView.vue'
import './ContestScene.scss'

export default Vue.extend({
  name: 'contest-scene',
  components: {
    ContestWidgetView,
    ContestChatView
  },
  props: {
    background: String
  }
})
</script>
