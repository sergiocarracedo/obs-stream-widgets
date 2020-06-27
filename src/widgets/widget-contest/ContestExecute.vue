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
        Answers: {{ currentQuestionAnswerUser.length || 0 }}
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
import { Question, Answer, Question as QuestionType, QuestionState, RankingUser } from './types'
import { mapState, createNamespacedHelpers } from 'vuex'
const contestStateHelper = createNamespacedHelpers('contest')
const CORRECT_POINTS = [1000, 900, 800, 700, 600]
const CORRECT_POINTS_DEFAULT = 500

export default Vue.extend({
  name: 'contest-execute',
  data () {
    return {
      currentQuestionAnswerUser: {} as Map<any>,
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
    },
    currentQuestionCorrectAnswers (): string[] {
      return this.$store.getters['contest/currentQuestion'].answers
        .filter((answer: Answer) => {
          return answer.correct
        })
        .map((answer: Answer) => {
          return String.fromCharCode(65 + answer.index)
        })
    }
  },
  methods: {
    onMessage (channel: string, tags: Map<any>, message: any, self: any) {
      if (self) {
        return
      }

      this.insertAnswer(
        tags['user-id'],
        tags.displayName || tags.username,
        message
      )
    },
    async launchQuestion () {
      this.$store.commit('contest/SOCKET_SET_CONTEST_STATUS_QUESTION_STATE', QuestionState.Active)
      this.$socket.client.emit('SET_CONTEST_STATUS_QUESTION_STATE', QuestionState.Active)
      await this.client.say(this.twitch.channel, '=======================')
      await this.client.say(this.twitch.channel, this.currentQuestion.title)
      await this.client.say(this.twitch.channel, '-----------------------')
      this.currentQuestion.answers.forEach((answer: Answer, index:number) => {
        this.client.say(this.twitch.channel, `${String.fromCharCode(65 + index)}: ${answer.text}`)
      })
      await this.client.say(this.twitch.channel, '-----------------------')
      this.client.on('chat', this.onMessage)
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
    async finishQuestion () {
      this.client.removeListener('chat', this.onMessage)
      await this.client.say(this.twitch.channel, '====== Pregunta finalizada =====')
      this.answersRecount()
      this.currentQuestionAnswerUser = {}
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
    insertAnswer (id: string, name: string, answer: string) {
      // check if user has another response
      if (!this.currentQuestionAnswerUser[id]) {
        this.currentQuestionAnswerUser[id] = {
          answer: answer.trim().substr(0, 1).toUpperCase(),
          name,
          id
        }
      }
      console.log(this.currentQuestionAnswerUser)
    },
    answersRecount () {
      const ranking = JSON.parse(JSON.stringify(this.status.ranking))
      let currentCurrentIndex = 0
      Object.entries(this.currentQuestionAnswerUser).forEach(([id, answerUser]) => {
        let item = ranking.find((rankingUser: RankingUser) => rankingUser.id === id)
        if (!item) {
          item = {
            id: answerUser.id,
            name: answerUser.name,
            points: 0
          }
          ranking.push(item)
        }

        if (this.currentQuestionCorrectAnswers.indexOf(answerUser.answer) !== -1) {
          item.points += CORRECT_POINTS[currentCurrentIndex++] || CORRECT_POINTS_DEFAULT
        }
      })

      // Sort
      ranking.sort((a: RankingUser, b: RankingUser) => {
        console.log(a.points - b.points, a.points, b.points)
        return a.points - b.points
      })
      this.$store.commit('contest/SOCKET_SET_CONTEST_RANKING', ranking)
      this.$socket.client.emit('SET_CONTEST_RANKING', ranking)
    }
  },
  async beforeMount () {
    this.client = new (tmi as any).Client({
      options: {
        clientId: this.twitch.cliendId,
        debug: false
      },
      connection: {
        reconnect: true,
        secure: true
      },
      identity: {
        username: `${this.twitch.channel}`,
        password: this.twitch.oauth
      },
      channels: [
        this.twitch.channel
      ]
    }) as any
    await this.client.connect()
  },
  beforeDestroy () {
    if (this.client) {
      this.client.disconnect()
    }
  }
})
</script>
