<template>
  <div class="talks-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Talks
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="4">
            <widget-url :url="widgetUrl"></widget-url>
          </v-col>
          <v-col cols="12" lg="4">
            <widget-url label="Widget url banner mode" :url="`${widgetUrl}?mode=banner`"></widget-url>
          </v-col>
          <v-col cols="12" lg="4">
            <widget-url label="Widget url cycle" :url="`${widgetUrl}?cycle`"></widget-url>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-radio-group v-model="selectedTalk">
      <v-card v-for="(talk, index) in localTalks" :key="index">
        <v-card-title>
          <v-radio :value="index" :label="talk.title"></v-radio>
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
            <v-col cols="12" lg="5">
              <v-text-field v-model="talk.title" label="Title" filled></v-text-field>
            </v-col>
            <v-col cols="12" lg="4">
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
          </v-row>
          <v-row>
            <v-col cols="12" lg="6">
              <widget-url :url="`${widgetUrl}?talk=${index}`"></widget-url>
            </v-col>
            <v-col cols="12" lg="6">
              <widget-url label="Widget url banner mode" :url="`${widgetUrl}?talk=${index}&mode=banner`"></widget-url>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-radio-group>
    <v-btn color="primary" @click="addTalk" class="mb-10">Add talk</v-btn>
    <div class="demo-wrapper mb-5">
      <talk-widget
        :talk="talk"
      ></talk-widget>
    </div>

    <h6 class="text-h6">Banner mode</h6>
    <div class="demo-wrapper">
      <talk-widget
        :talk="talk"
        mode="banner"
      ></talk-widget>
    </div>
  </div>
</template>
<script lang="ts">
import Widget from '@/mixins/Widget'
import WidgetUrl from '@/components/WidgetUrl.vue'
import TalkWidget from './Talk.vue'
import './TalksSettings.scss'
import { Talk as TalkType } from './types'
import UploadBtn from '@/components/UploadBtn.vue'

export default Widget.extend({
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
        return this.$store.state.talks.selectedTalk || 0
      },
      set (index: number) {
        this.commitAndEmit('SET_SELECTED_TALK', 'talks', index)
      }
    },
    talk (): TalkType {
      return this.talks[this.selectedTalk] || {}
    },
    widgetUrl () {
      return `${this.$store.state.basePath}/widget/talks/`
    }
  },
  methods: {
    addTalk () {
      this.localTalks.push({
        title: '',
        speaker: {
          name: '',
          picture: ''
        }
      })
    },
    removeTalk (index: number) {
      this.$confirm(
        'Do you really want to delete talk?',
        { title: 'Warning' }
      ).then((res: boolean | undefined) => {
        if (res) {
          this.talks = this.talks.splice(index, 1)
        }
      })
    },
    onUpload (image: string, index: number) {
      this.talks[index].speaker.picture = image
    }
  },
  watch: {
    localTalks: {
      deep: true,
      handler (newValue) {
        this.commitAndEmit('SET_TALKS', 'talks', newValue)
      }
    }
  },
  beforeMount () {
    this.localTalks = this.talks
  }
})
</script>
