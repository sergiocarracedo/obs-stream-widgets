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
    ></contest-question-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import './Contest.scss'
import ContestQuestionWidget from './ContestQuestion.vue'
import ContestRankingWidget from './ContestRanking.vue'
import { Question, RankingUser, QuestionState } from './types'

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
    ranking: {
      type: Array as () => RankingUser[]
    },
    state: String as () => QuestionState
  },
  data () {
    return {
      QuestionState
    }
  },
  computed: {
    showCorrect (): boolean {
      return this.state === QuestionState.Finished
    }
  }
})
</script>
