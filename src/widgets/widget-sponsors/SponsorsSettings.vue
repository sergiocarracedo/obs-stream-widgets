<template>
  <div class="sponsors-settings">
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
          <v-col cols="12" lg="3" class="pt-5">
            <upload-btn
              @upload="onUpload($event, index)"
              :max-width="270"
              :max-height="70"
            ></upload-btn>
          </v-col>
          <v-col cols="12" lg="4">
            <div class="d-flex align-center align-self-center">
              <v-img :src="sponsor.logo" contain max-width="60" max-height="60"></v-img>
              <v-spacer></v-spacer>
              <v-btn color="red" icon @click="removeSponsor(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-alert type="info" border="left" color="yellow" text>Size 300x100px</v-alert>
    <div class="demo-wrapper">
      <sponsors-widget
        :sponsors="sponsors"
      ></sponsors-widget>
    </div>
  </div>
</template>
<script lang="ts">
import Widget from '@/mixins/Widget'
import WidgetUrl from '@/components/WidgetUrl.vue'
import SponsorsWidget from './Sponsors.vue'
import './SponsorsSettings.scss'
import { Sponsor as SponsorType } from './types'
import UploadBtn from '@/components/UploadBtn.vue'

export default Widget.extend({
  name: 'sponsors-settings',
  components: {
    WidgetUrl,
    SponsorsWidget,
    UploadBtn
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
        logo: '',
        name: 'New Sponsor'
      })
    },
    removeSponsor (index: number) {
      this.sponsors = this.sponsors.splice(index, 1)
    },
    onUpload (image: String, index: number) {
      this.sponsors[index].logo = image
    }
  },
  watch: {
    localSponsors: {
      deep: true,
      handler (newValue) {
        this.commitAndEmit('SET_SPONSORS', 'sponsors', newValue)
      }
    }
  },
  beforeMount () {
    this.localSponsors = this.sponsors
  }
})
</script>
