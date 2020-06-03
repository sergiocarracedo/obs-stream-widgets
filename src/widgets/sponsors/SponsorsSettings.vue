<template>
  <div class="countdown-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Sponsors
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <widget-url :url="widgetUrl"></widget-url>
          </v-col>
        </v-row>

        <v-btn @click="addSponsor">Add sponsor</v-btn>
        <v-row v-for="(sponsor, index) in localSponsors" :key="index">
          <v-col cols="12" lg="5">
            <v-text-field v-model="sponsor.name" label="Name" filled></v-text-field>
          </v-col>
          <v-col cols="12" lg="5">
            <v-file-input
              v-model="sponsor.logo"
              accept="image/*"
              label="Logo"
              filled
              @change="onFileChange($event, index)"
            ></v-file-input>
          </v-col>
          <v-col cols="12" lg="2">
            <v-btn color="red" icon @click="removeSponsor(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-img :src="sponsor.logoSrc" contain max-width="60" max-height="60"></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <sponsors-widget
      :sponsors="sponsors"
    ></sponsors-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WidgetUrl from '@/components/WidgetUrl.vue'
import SponsorsWidget from './Sponsors.vue'
import './SponsorsSettings.scss'
import { Sponsor as SponsorType } from './types'

export default Vue.extend({
  name: 'sponsors-settings',
  components: {
    WidgetUrl,
    SponsorsWidget
  },
  data () {
    return {
      localSponsors: [] as SponsorType[]
    }
  },
  computed: {
    sponsors (): SponsorType[] {
      return this.$store.state.sponsors.sponsors
    },
    widgetUrl () {
      return `${this.$store.state.basePath}/widget/sponsors/`
    }
  },
  methods: {
    addSponsor () {
      this.localSponsors.push({
        logo: {} as any,
        logoSrc: '',
        name: 'New Sponsor'
      })
    },
    removeSponsor (index: number) {
      this.sponsors = this.sponsors.splice(index - 1, 1)
    },
    onFileChange (e: File, index: number) {
      this.sponsors[index].logoSrc = e ? URL.createObjectURL(e) : ''
    }
  },
  watch: {
    localSponsors: {
      deep: true,
      handler (newValue) {
        this.$store.commit('sponsors/SOCKET_SET_SPONSORS', newValue)
        this.$socket.client.emit('SET_SPONSORS', newValue)
      }
    }
  },
  beforeMount () {
    this.localSponsors = this.sponsors
  }
})
</script>
