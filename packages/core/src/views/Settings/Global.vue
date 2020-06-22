<template>
  <div class="global-settings">
    <v-card class="mb-8">
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

    <v-card class="mb-8">
      <v-card-title class="heading">
        Twitch
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Client ID"
              filled
              v-model="localTwitch.clientId"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              label="Client Secret"
              filled
              v-model="localTwitch.clientSecret"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Youtube, Twitch } from '@obs-stream-widgets/core-utils/types'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'global-settings',
  components: {},
  data () {
    return {
      localYoutube: {} as Youtube,
      localTwitch: {} as Twitch
    }
  },
  computed: {
    ...mapState(['youtube', 'twitch'])
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
    }
  },
  beforeMount () {
    this.localYoutube = this.youtube
    this.localTwitch = this.twitch
  }
})
</script>
