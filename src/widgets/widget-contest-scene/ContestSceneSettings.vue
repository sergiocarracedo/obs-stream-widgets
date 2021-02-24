<template>
  <div class="contest-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Contest Scene
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <widget-url :url="widgetUrl"></widget-url>
          </v-col>
        </v-row>
      </v-card-text>

      <v-row>
        <v-col cols="12" lg="6" class="pt-5">
          <upload-btn
            @upload="onUpload"
            :max-width="270"
            :max-height="270"
          ></upload-btn>
        </v-col>
        <v-col cols="12" lg="4">
          <div class="d-flex align-center align-self-center">
            <v-img :src="background" contain max-width="60" max-height="60"></v-img>
            <v-spacer></v-spacer>
            <v-btn color="red" icon @click="removeBackground">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-alert v-if="platform !== Platform.Twitch" type="error" border="left" color="red" text>This widget only works for Twitch</v-alert>

    <div class="demo-wrapper">
      <contest-scene-widget></contest-scene-widget>
    </div>
  </div>
</template>
<script lang="ts">
import Widget from '@/mixins/Widget'
import WidgetUrl from '@/components/WidgetUrl.vue'
import ContestSceneWidget from './ContestScene.vue'
import UploadBtn from '@/components/UploadBtn.vue'
import './ContestSceneSettings.scss'
import { mapState } from 'vuex'
import { Platform } from '@/enums'

export default Widget.extend({
  name: 'Questions-settings',
  components: {
    WidgetUrl,
    UploadBtn,
    ContestSceneWidget
  },
  data () {
    return {
      Platform
    }
  },
  methods: {
    onUpload (image: File) {
      this.commitAndEmit('SET_CONTEST_SCENE_BG', 'contestScene', image)
    },
    removeBackground () {
      this.commitAndEmit('SET_CONTEST_SCENE_BG', 'contestScene', '')
    }
  },
  computed: {
    ...mapState(['platform']),
    background (): string {
      return this.$store.state.contestScene.background
    },
    widgetUrl (): string {
      return `${this.$store.state.basePath}/widget/contest-scene/`
    }
  }
})
</script>
