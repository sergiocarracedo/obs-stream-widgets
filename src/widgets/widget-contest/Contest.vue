<template>
  <div>
    <contest-ranking-widget
      v-if="state === QuestionState.Ranking"
      :ranking="ranking"
    ></contest-ranking-widget>
    <contest-question-widget
      v-if="state === QuestionState.Active || state === QuestionState.Finished"
      :question="question"
      :state="state"
      :showCorrect="showCorrect"
      :index="index"
    ></contest-question-widget>
    <div class="contest-wrapper" v-if="state === QuestionState.Ready">
      <div class="contest-pre-question">
        <h1 class="primary-bg">{{ index }} / {{ total }}</h1>
        <div class="help primary-light-bg text-dark">
          <h6>Respuestas correctas</h6>
          <ul>
            <li v-for="(points, index) in CORRECT_POINTS" :key="index">
              <strong>{{ index + 1}}ª</strong><span class="spacer"></span> {{ points }} puntos
            </li>
            <li>
              <strong>Resto</strong><span class="spacer"></span> {{ CORRECT_POINTS_DEFAULT }} puntos
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import './Contest.scss'
import ContestQuestionWidget from './ContestQuestion.vue'
import ContestRankingWidget from './ContestRanking.vue'
import { Question, RankingUser, QuestionState } from './types'
import { CORRECT_POINTS_DEFAULT, CORRECT_POINTS } from './consts'

export default Vue.extend({
  name: 'contest',
  components: {
    ContestRankingWidget,
    ContestQuestionWidget
  },
  props: {
    question: {
      type: Object as () => Question
    },
    index: Number,
    total: Number,
    ranking: {
      type: Array as () => RankingUser[]
    },
    state: String as () => QuestionState
  },
  data () {
    return {
      QuestionState,
      CORRECT_POINTS_DEFAULT,
      CORRECT_POINTS
    }
  },
  computed: {
    showCorrect (): boolean {
      return this.state === QuestionState.Finished
    }
  }
})
</script>
