<template>
  <div class="contest-execution mt-5">
    <div class="d-flex">
      <v-text-field filled v-model="currentQuestionIndex" label="Current Question" class="mr-5" disabled></v-text-field>
      <v-switch disabled v-model="status.questionActive" label="Active"></v-switch>
      <v-spacer></v-spacer>
    </div>
    <div class="d-flex align-center">
      <v-btn v-if="!status.questionActive" @click="launchQuestion">
        Launch question
      </v-btn>
      <template v-else>
        <template v-if="!this.isLastQuestion">
          <v-btn color="primary" @click="finishQuestion">
            Finish question
          </v-btn>
          <v-chip class="ml-5">
            Answers: {{ currentQuestionAnswers.lenght }}
          </v-chip>
        </template>
      </template>
      <v-spacer></v-spacer>
      <v-btn color="red" @click="resetContest">
        Reset contest
      </v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import tmi from 'tmi.js'
import { Map } from '@/types'
import {Question, Answer, Question as QuestionType} from './types'
import { mapState, createNamespacedHelpers } from 'vuex'
const contestStateHelper = createNamespacedHelpers('contest')

export default Vue.extend({
  name: 'contest-execute',
  data () {
    return {
      currentQuestionAnswers: {} as Map<string>
    }
  },
  computed: {
    ...mapState(['twitch', 'platform']),
    ...contestStateHelper.mapState(['questions', 'status']),
    currentQuestionIndex (): number | string {
      return this.status.questionIndex + 1
    },
    currentQuestion (): QuestionType {
      return this.$store.getters['contest/currentQuestion']
    },
    isLastQuestion (): boolean {
      return this.status.questionIndex >= (this.questions.length - 1)
    }
  },
  methods: {
    launchQuestion () {
      this.$store.commit('contest/SOCKET_SET_CONTEST_STATUS_QUESTION_STATUS', true)
      window.alert(this.currentQuestion.title)

      const client = new (tmi as any).Client({
        options: {
          debug: false
        },
        connection: {
          reconnect: true,
          secure: true
        },
        identity: {
          username: this.twitch.cliendId,
          password: this.twitch.clientSecret
        },
        channels: [
          this.twitch.channel
        ]
      }) as any
      client.connect()

      client.say(this.twitch.channel, this.currentQuestion.title)

      this.currentQuestion.answers.forEach((answer: Answer, index:number) => {
        client.say(this.twitch.channel, `${String.fromCharCode(65 + index)}: ${answer.text}`)
      })

      client.on('message', (channel: string, tags: Map<any>, message: any, self: any) => {
        if (self) {
          return
        }

        this.insertAnswer(
          tags.id,
          tags.displayName,
          message
        )
      })
    },
    finishQuestion () {
      this.answersRecount()
      this.$store.commit('contest/SOCKET_SET_CONTEST_STATUS_QUESTION_STATUS', false)
      this.nextQuestion()
    },
    nextQuestion () {
      if (!this.isLastQuestion) {
        this.$store.commit('contest/SOCKET_SET_CONTEST_STATUS_QUESTION_INDEX', this.status.questionIndex + 1)
      }
    },
    resetContest () {
      this.$confirm(
        'Do you really want to reset contest?',
        { title: 'Warning' }
      ).then((res: boolean | undefined) => {
        if (res) {
          this.$store.commit('contest/SOCKET_CONTEST_RESET')
        }
      })
    },
    answersRecount () {
      return null
    },
    insertAnswer (id: string, name: string, answer: string) {
      // check if user has another response
      if (!this.currentQuestionAnswers[id]) {
        this.currentQuestionAnswers[id] = answer.substr(0, 1)
      }
    }
  }
})
</script>
