<template>
  <div class="chat-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Chat
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <widget-url :url="widgetUrl"></widget-url>
          </v-col>
          <v-col cols="12" lg="6">

          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-alert type="info" border="left" color="yellow" text>Size 500x400px</v-alert>
    <div class="demo-wrapper">
      <chat-widget
        :youtube-settings="youtubeSettings"
        :twitch-settings="twitchSettings"
        :test-mode="true"
      ></chat-widget>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WidgetUrl from '@/components/WidgetUrl.vue'
import ChatWidget from './Chat.vue'
import './ChatSettings.scss'
import { Twitch, Youtube } from '@/types'

export default Vue.extend({
  name: 'chat-settings',
  components: {
    WidgetUrl,
    ChatWidget
  },
  computed: {
    widgetUrl (): string {
      return `${this.$store.state.basePath}/widget/chat/`
    },
    youtubeSettings (): Youtube {
      return this.$store.state.youtube as Youtube
    },
    twitchSettings (): Twitch {
      return this.$store.state.twitch as Twitch
    }
  },
  methods: {

  }
})
</script>
