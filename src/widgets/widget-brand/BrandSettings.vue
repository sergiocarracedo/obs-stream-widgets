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
          <v-col cols="12" lg="6" class="pt-5">
            <upload-btn
              @upload="onUpload"
              :max-width="270"
              :max-height="270"
            ></upload-btn>
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
import Widget from '@/mixins/Widget'
import WidgetUrl from '@/components/WidgetUrl.vue'
import BrandWidget from './Brand.vue'
import UploadBtn from '@/components/UploadBtn.vue'
import './BrandSettings.scss'

export default Widget.extend({
  name: 'brand-settings',
  components: {
    WidgetUrl,
    BrandWidget,
    UploadBtn
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
    onUpload (image: File) {
      this.commitAndEmit('SET_LOGO', 'brand', image)
    }
  }
})
</script>
