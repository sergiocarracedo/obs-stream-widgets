<template>
  <div class="brand-settings">
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
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Youtube } from '../../types/youtube'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'global-settings',
  components: {},
  data () {
    return {
      localYoutube: {} as Youtube
    }
  },
  computed: {
    ...mapState(['youtube'])
  },
  watch: {
    localYoutube: {
      deep: true,
      handler (newValue) {
        this.$store.commit('SOCKET_SET_YOUTUBE', newValue)
        this.$socket.client.emit('SET_YOUTUBE', newValue)
      }
    }
  },
  beforeMount () {
    this.localYoutube = this.youtube
  }
})
</script>
