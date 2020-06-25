<template>
  <div class="chat-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Followers
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
      <followers-widget></followers-widget>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WidgetUrl from '@/components/WidgetUrl.vue'
import FollowersWidget from './Followers.vue'
import './FollowersSettings.scss'

export default Vue.extend({
  name: 'chat-settings',
  components: {
    WidgetUrl,
    FollowersWidget
  },
  data () {
    return {
      testMode: true
    }
  },
  computed: {
    widgetUrl (): string {
      return `${this.$store.state.basePath}/widget/followers/`
    }
  },
  methods: {

  }
})
</script>
