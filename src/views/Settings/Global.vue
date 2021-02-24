<template>
  <div class="global-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Steaming platform to use
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-radio-group v-model="localPlatform">
              <v-radio :key="key" v-for="(value, key) in platforms" :label="key" :value="value"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-8" v-if="localPlatform === 'youtube'">
      <v-card-title class="heading">
        YouTube
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Channel Id"
              filled
              v-model="localYoutube.channelId"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              label="API key"
              filled
              v-model="localYoutube.apiKey"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-8" v-if="localPlatform === 'twitch'">
      <v-card-title class="heading">
        Twitch
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Channel"
              filled
              v-model="localTwitch.channel"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Oauth"
              filled
              v-model="localTwitch.oauth"
              hint="You can get from https://twitchapps.com/tmi/"
              persistent-hint
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Twitch, Youtube } from '@/types'
import { mapState } from 'vuex'
import { Platform } from '@/enums'

export default Vue.extend({
  name: 'global-settings',
  components: {},
  data () {
    return {
      localYoutube: {} as Youtube,
      localTwitch: {} as Twitch,
      platforms: Platform,
      localPlatform: Platform.YouTube as Platform
    }
  },
  computed: {
    ...mapState(['youtube', 'twitch', 'platform'])
  },
  watch: {
    localYoutube: {
      deep: true,
      handler (newValue) {
        this.$store.commit('SOCKET_SET_YOUTUBE', newValue)
        this.$socket.client.emit('SET_YOUTUBE', newValue)
      }
    },
    localTwitch: {
      deep: true,
      handler (newValue) {
        this.$store.commit('SOCKET_SET_TWITCH', newValue)
        this.$socket.client.emit('SET_TWITCH', newValue)
      }
    },
    localPlatform (newValue) {
      this.$store.commit('SOCKET_SET_PLATFORM', newValue)
      this.$socket.client.emit('SET_PLATFORM', newValue)
    }
  },
  beforeMount () {
    this.localYoutube = this.youtube
    this.localTwitch = this.twitch
    this.localPlatform = this.platform
  }
})
</script>
