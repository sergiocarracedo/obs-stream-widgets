<template>
  <div class="brand-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Brand
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <widget-url :url="widgetUrl"></widget-url>
          </v-col>
          <v-col cols="12" lg="6">
            <v-file-input
              accept="image/*"
              label="Logo"
              filled
              @change="onFileChange"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <div class="demo-wrapper">
      <brand-widget
        :logo="logo"
      ></brand-widget>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WidgetUrl from '../core/src/components/WidgetUrl.vue'
import BrandWidget from './Brand.vue'
import './BrandSettings.scss'

export default Vue.extend({
  name: 'brand-settings',
  components: {
    WidgetUrl,
    BrandWidget
  },
  computed: {
    logo (): string {
      return this.$store.state.brand.logo
    },
    widgetUrl () {
      return `${this.$store.state.basePath}/widget/brand/`
    }
  },
  methods: {
    async onFileChange (e: File) {
      const toBase64 = (file: File) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })

      const logo = (await toBase64(e)) as string
      this.$store.commit('brand/SOCKET_SET_LOGO', logo)
      this.$socket.client.emit('SET_LOGO', logo)
    }
  }
})
</script>
