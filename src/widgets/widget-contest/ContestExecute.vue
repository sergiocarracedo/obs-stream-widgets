<template>
  <div class="contest-execution mt-5">
    <div class="d-flex">
      <v-text-field filled v-model="currentQuestionIndex" label="Current Question" class="mr-5" disabled></v-text-field>
      <v-select
        filled
        v-model="status.question.state"
        label="Current State"
        class="mr-5"
        :items="questionStates"
        item-text="label"
        item-value="value"
        disabled
      ></v-select>
      <v-spacer></v-spacer>
    </div>
    <div class="d-flex align-center">
      <v-btn v-if="status.question.state === QuestionState.Ready" @click="launchQuestion">
        Launch question
      </v-btn>
      <v-btn v-if="status.question.state === QuestionState.Active" color="primary" @click="finishQuestion">
        Finish question
      </v-btn>
      <v-btn
        v-if="status.question.state === QuestionState.Finished"
        color="primary"
        @click="showRanking"
        class="mr-5"
      >
        Show Ranking
      </v-btn>
      <v-btn
        v-if="(status.question.state === QuestionState.Finished || status.question.state === QuestionState.Ranking) && !this.isLastQuestion"
        color="primary"
        @click="nextQuestion"
      >
        Next Question
      </v-btn>
      <v-chip class="ml-5">
        Answers: {{ currentQuestionAnswers.length }}
      </v-chip>
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
import { Question, Answer, Question as QuestionType, QuestionState } from './types'
import { mapState, createNamespacedHelpers } from 'vuex'
const contestStateHelper = createNamespacedHelpers('contest')

export default Vue.extend({
  name: 'contest-execute',
  data () {
    return {
      currentQuestionAnswers: {} as Map<string>,
      QuestionState,
      client: null as any
    }
  },
  computed: {
    ...mapState(['twitch', 'platform']),
    ...contestStateHelper.mapState(['questions', 'status']),
    currentQuestionIndex (): number | string {
      return this.status.question.index + 1
    },
    currentQuestion (): QuestionType {
      return this.$store.getters['contest/currentQuestion']
    },
    isLastQuestion (): boolean {
      return this.status.question.index >= (this.questions.length - 1)
    },
    questionStates (): Map<string>[] {
      return Object.entries(QuestionState).map(([label, value]) => {
        return {
          value,
          label
        }
      })
    }
  },
  methods: {
    launchQuestion () {
      this.$store.commit('contest/SOCKET_SET_CONTEST_STATUS_QUESTION_STATE', QuestionState.Active)
      this.$socket.client.emit('SET_CONTEST_STATUS_QUESTION_STATE', QuestionState.Active)

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

      // client.say(this.twitch.channel, this.currentQuestion.title)

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
    showRanking () {
      this.$store.commit('contest/SOCKET_SET_CONTEST_STATUS_QUESTION_STATE', QuestionState.Ranking)
      this.$socket.client.emit('SET_CONTEST_STATUS_QUESTION_STATE', QuestionState.Ranking)
    },
    nextQuestion () {
      if (!this.isLastQuestion) {
        this.$store.commit('contest/SOCKET_SET_CONTEST_STATUS_QUESTION_INDEX', this.status.question.index + 1)
        this.$socket.client.emit('SET_CONTEST_STATUS_QUESTION_INDEX', this.status.question.index)
        this.$store.commit('contest/SOCKET_SET_CONTEST_STATUS_QUESTION_STATE', QuestionState.Ready)
        this.$socket.client.emit('SET_CONTEST_STATUS_QUESTION_STATE', QuestionState.Ready)
      }
    },
    finishQuestion () {
      this.answersRecount()
      this.$store.commit('contest/SOCKET_SET_CONTEST_STATUS_QUESTION_STATE', QuestionState.Finished)
      this.$socket.client.emit('SET_CONTEST_STATUS_QUESTION_STATE', QuestionState.Finished)
    },
    resetContest () {
      this.$confirm(
        'Do you really want to reset contest?',
        { title: 'Warning' }
      ).then((res: boolean | undefined) => {
        if (res) {
          this.$store.commit('contest/SOCKET_CONTEST_RESET')
          this.$socket.client.emit('CONTEST_RESET')
        }
      })
    },
    answersRecount () {
      return null
    },
    insertAnswer (id: string, name: string, answer: string) {
      // check if user has another response
      if (!this.currentQuestionAnswers[id]) {
        this.currentQuestionAnswers[id] = answer.substr(0, 1).toUpperCase()
      }
    }
  },
  beforeDestroy() {
    if (this.client) {
      this.client.disconect()
    }
  }
})
</script>
