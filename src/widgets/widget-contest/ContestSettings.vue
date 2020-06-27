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
        :ranking="ranking"
      ></contest-widget>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WidgetUrl from '@/components/WidgetUrl.vue'
import ContestWidget from './Contest.vue'
import ContestExecute from './ContestExecute.vue'
import './ContestSettings.scss'
import { Answer, ContestStatus, Question as QuestionType, RankingUser } from './types'
import { mapState } from 'vuex'
import { Platform } from '@/enums'

export default Vue.extend({
  name: 'Questions-settings',
  components: {
    WidgetUrl,
    ContestWidget,
    ContestExecute
  },
  data () {
    return {
      localQuestions: [] as QuestionType[],
      contestActive: false,
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
    ranking (): RankingUser[] {
      return [
        {
          id: 1,
          name: 'Sergio Carracedo',
          points: 1234
        },
        {
          id: 2,
          name: 'Félix Gómez',
          points: 1123
        },
        {
          id: 3,
          name: 'Rolando Caldas',
          points: 1045
        },
        {
          id: 4,
          name: 'Fran Iglesias',
          points: 909
        },
        {
          id: 5,
          name: 'Catalina Rey',
          points: 900
        }
      ]
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
          correct: false
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
          this.localQuestions = this.localQuestions.splice(index, 1)
        }
      })

    },
    confirmExit () {
      if (this.contestActive) {
        return 'The contest is active if. Are you sure?'
      } else {
        return false
      }
    }
  },
  watch: {
    localQuestions: {
      deep: true,
      handler (newValue: any) {
        this.$store.commit('contest/SOCKET_SET_QUESTIONS', newValue)
        this.$socket.client.emit('SET_QUESTIONS', newValue)
      }
    },
    contestActive (newValue) {
      if (!newValue) {
        this.$store.commit('contest/SOCKET_CONTEST_RESET')
      }
    }
  },
  beforeMount () {
    this.localQuestions = this.questions
    window.onbeforeunload = this.confirmExit
  }
})
</script>
