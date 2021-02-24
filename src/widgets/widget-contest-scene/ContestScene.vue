<template>
  <div class="contest-scene-widget" :style="`background-image: url(${background})`">
    <div class="grid-row">
      <div class="col-xs-12 col-sm-8">
        <brand-view></brand-view>
      </div>
    </div>
    <div class="grid-row">
      <div class="col-xs-12 col-sm-8">
        <contest-widget-view></contest-widget-view>
      </div>

      <div class="col-xs-12 col-sm-4">
        <contest-chat-view></contest-chat-view>
      </div>
    </div>
    <div class="grid-row">
      <div class="col-xs-12 col-sm-8">
        Sponsors
        <sponsors-view></sponsors-view>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import BrandView from '../widget-brand/BrandView.vue'
import SponsorsView from '../widget-sponsors/SponsorsView.vue'
import ContestWidgetView from '../widget-contest/ContestView.vue'
import ContestChatView from '../widget-chat/ChatView.vue'
import './ContestScene.scss'

export default Vue.extend({
  name: 'contest-scene',
  components: {
    ContestWidgetView,
    ContestChatView,
    BrandView,
    SponsorsView
  },
  props: {
    background: String
  }
})
</script>
