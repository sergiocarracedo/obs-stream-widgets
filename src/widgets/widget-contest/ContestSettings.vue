<template>
  <div class="contest-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Contest
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <widget-url :url="widgetUrl"></widget-url>
          </v-col>
          <v-col cols="12" lg="6" class="pt-5">
            Questions
            <v-btn :href="downloadStateUrl" download="obs-stream-widgets-questions.json" class="ml-2 mr-2">
              <v-icon left>mdi-cloud-download</v-icon>Export
            </v-btn>

            <v-btn @click="onImportClick">
              <v-icon left>mdi-cloud-upload</v-icon>
              Import
            </v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              accept="text/json"
              @change="onFileChanged"
            >
          </v-col>
        </v-row>

        <v-btn v-if="!contestActive" color="primary" @click="startContest">Start contest</v-btn>
        <v-btn color="red" v-else @click="stopContest">Stop contest</v-btn>

        <contest-execute v-if="contestActive"></contest-execute>
      </v-card-text>
    </v-card>

    <v-alert v-if="platform !== Platform.Twitch" type="error" border="left" color="red" text>This widget only works for Twitch</v-alert>

    <template v-if="!contestActive">
      <v-card v-for="(question, index) in localQuestions" :key="index" class="mt-5">
        <v-card-title>
          <h2 class="text-h6">Question {{index + 1}}</h2>
          <v-spacer></v-spacer>
          <div class="d-flex align-center align-self-center">
            <v-spacer></v-spacer>
            <v-btn color="red" icon @click="removeQuestion(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" lg="12">
              <v-textarea v-model="question.title" label="Question" filled rows="3"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(answer, index) in question.answers" :key="index" cols="12" lg="6" class="d-flex">
              <v-text-field filled :label="`Anwser ${index + 1}`" v-model="question.answers[index].text" class="mr-3"></v-text-field>
              <v-checkbox label="Correct" v-model="question.answers[index].correct"></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-btn @click="addQuestion" color="primary" class="mb-10 mt-5">Add question</v-btn>
    </template>
    <div class="demo-wrapper">
      <contest-widget
        :state="status.question.state"
        :question="currentQuestion"
        :ranking="status.ranking"
        :index="status.question.index + 1"
        :total="questions.length"
        :active="status.active"
      ></contest-widget>
    </div>
  </div>
</template>
<script lang="ts">
import Widget from '@/mixins/Widget'
import WidgetUrl from '@/components/WidgetUrl.vue'
import ContestWidget from './Contest.vue'
import ContestExecute from './ContestExecute.vue'
import './ContestSettings.scss'
import { Answer, ContestStatus, Question as QuestionType, RankingUser } from './types'
import { mapState } from 'vuex'
import { Platform } from '@/enums'

export default Widget.extend({
  name: 'Questions-settings',
  components: {
    WidgetUrl,
    ContestWidget,
    ContestExecute
  },
  data () {
    return {
      localQuestions: [] as QuestionType[],
      Platform
    }
  },
  computed: {
    ...mapState(['platform']),
    status (): ContestStatus {
      return this.$store.state.contest.status
    },
    questions (): QuestionType[] {
      return this.$store.state.contest.questions
    },
    currentQuestion (): QuestionType {
      return this.$store.getters['contest/currentQuestion']
    },
    widgetUrl (): string {
      return `${this.$store.state.basePath}/widget/contest/`
    },
    contestActive: {
      get (): boolean {
        return this.status.active
      },
      set (active: boolean) {
        this.commitAndEmit('SET_CONTEST_ACTIVE', 'contest', active)
      }
    },
    downloadStateUrl (): string {
      const data = new Blob([JSON.stringify(this.$store.state.contest.questions)], {
        encoding: 'UTF-8',
        type: 'text/json'
      } as any)

      return window.URL.createObjectURL(data)
    }
  },
  methods: {
    startContest () {
      this.contestActive = true
    },
    stopContest () {
      this.$confirm(
        'Do you really want to exit?',
        { title: 'Warning' }
      ).then((res: boolean | undefined) => {
        if (res) {
          this.contestActive = false
        }
      })
    },
    addQuestion () {
      const answers = [] as Answer[]

      for (let i = 0; i < 4; i++) {
        answers.push({
          text: '',
          correct: false,
          index: i
        })
      }
      this.localQuestions.push({
        title: '',
        answers
      })
    },
    removeQuestion (index: number) {
      this.$confirm(
        'Do you really want to delete question?',
        { title: 'Warning' }
      ).then((res: boolean | undefined) => {
        if (res) {
          this.localQuestions.splice(index, 1)
        }
      })
    },
    confirmExit () {
      if (this.contestActive) {
        return 'The contest is active if. Are you sure?'
      } else {
        return
      }
    },
    onImportClick () {
      (this.$refs.uploader as HTMLElement).click()
    },
    onFileChanged (e: any) {
      const file = e.target.files[0]
      const read = new FileReader()

      read.readAsText(file)

      read.onloadend = () => {
        const result = JSON.parse(read.result as string)
        this.localQuestions = result
      }
    }
  },
  watch: {
    localQuestions: {
      deep: true,
      handler (newValue: any) {
        this.commitAndEmit('SET_QUESTIONS', 'contest', newValue)
      }
    },
    contestActive (newValue) {
      this.commitAndEmit('CONTEST_RESET', 'contest')
    }
  },
  beforeMount () {
    this.localQuestions = this.questions
    window.onbeforeunload = this.confirmExit
  }
})
</script>
