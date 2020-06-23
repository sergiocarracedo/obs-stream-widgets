<template>
  <div class="global-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Theme
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="4">
            <h6 class="text-h6">Primary</h6>
            <v-color-picker v-model="primary" mode="hexa"></v-color-picker>
          </v-col>
          <v-col cols="12" lg="4">
            <h6 class="text-h6">Secondary</h6>
            <v-color-picker v-model="primaryLight" mode="hexa"></v-color-picker>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'theme-settings',
  computed: {
    primary: {
      get (): string {
        return this.$store.state.theme.primary
      },
      set (color:string) {
        this.$store.commit('theme/SOCKET_SET_PRIMARY', color)
        this.$socket.client.emit('SET_PRIMARY', color)
      }
    },
    primaryLight: {
      get (): string {
        return this.$store.state.theme.primaryLight
      },
      set (color:string) {
        this.$store.commit('theme/SOCKET_SET_PRIMARY_LIGHT', color)
        this.$socket.client.emit('SET_PRIMARY_LIGHT', color)
      }
    }
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
  }
})
</script>
