<template>
  <div class="talks-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Talks
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <widget-url :url="widgetUrl"></widget-url>
          </v-col>
        </v-row>

        <v-btn @click="addTalk">Add talk</v-btn>
      </v-card-text>
    </v-card>

    <v-radio-group v-model="selectedTalk">
      <v-card v-for="(talk, index) in localTalks" :key="index">
        <v-card-title>
          <v-radio :value="index" :label="talk.name"></v-radio>
          <v-spacer></v-spacer>
          <div class="d-flex align-center align-self-center">
            <v-spacer></v-spacer>
            <v-btn color="red" icon @click="removeTalk(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" lg="3">
              <v-text-field v-model="talk.name" label="Title" filled></v-text-field>
            </v-col>
            <v-col cols="12" lg="3">
              <v-text-field v-model="talk.speaker.name" label="Ponente" filled></v-text-field>
            </v-col>
            <v-col cols="12" lg="3">
              <upload-btn
                class="mt-6 mr-3"
                @upload="onUpload($event, index)"
                :max-width="200"
                :max-height="200"
              ></upload-btn>
              <v-avatar width="40">
                <v-img :src="talk.speaker.picture"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="12" lg="3">
              <widget-url :url="`${widgetUrl}?talk=${index}`"></widget-url>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-radio-group>
    <v-alert type="info" border="left" color="yellow" text>Size 300x100px</v-alert>
    <div class="demo-wrapper">
      <talk-widget
        :talk="talk"
      ></talk-widget>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WidgetUrl from '@/components/WidgetUrl.vue'
import TalkWidget from './Talk.vue'
import './TalksSettings.scss'
import { Talk as TalkType } from './types'
import UploadBtn from '@/components/UploadBtn.vue'

export default Vue.extend({
  name: 'talks-settings',
  components: {
    WidgetUrl,
    TalkWidget,
    UploadBtn
  },
  data () {
    return {
      localTalks: [] as TalkType[]
    }
  },
  computed: {
    talks (): TalkType[] {
      return this.$store.state.talks.talks
    },
    selectedTalk: {
      get (): number {
        return this.$store.state.talks.selectedTalk
      },
      set (index: number) {
        this.$store.commit('talks/SOCKET_SET_SELECTED_TALK', index)
        this.$socket.client.emit('SET_SELECTED_TALK', index)
      }
    },
    talk (): TalkType {
      console.log(this.selectedTalk, this.talks[this.selectedTalk] || {})
      return this.talks[this.selectedTalk] || {}
    },
    widgetUrl () {
      return `${this.$store.state.basePath}/widget/talks/`
    }
  },
  methods: {
    addTalk () {
      this.localTalks.push({
        name: '',
        speaker: {
          name: '',
          picture: ''
        }
      })
    },
    removeTalk (index: number) {
      this.talks = this.talks.splice(index, 1)
    },
    onUpload (image: String, index: number) {
      this.talks[index].speaker.picture = image
    }
  },
  watch: {
    localTalks: {
      deep: true,
      handler (newValue) {
        this.$store.commit('talks/SOCKET_SET_TALKS', newValue)
        this.$socket.client.emit('SET_TALKS', newValue)
      }
    }
  },
  beforeMount () {
    this.localTalks = this.talks
  }
})
</script>
