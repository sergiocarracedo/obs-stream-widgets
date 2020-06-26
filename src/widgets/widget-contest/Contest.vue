<template>
  <div>
    <contest-ranking-widget
      v-if="!active"
      :ranking="ranking"
    ></contest-ranking-widget>
    <contest-question-widget
      v-else
      :question="question"
    ></contest-question-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import './Contest.scss'
import ContestQuestionWidget from './ContestQuestion.vue'
import ContestRankingWidget from './ContestRanking.vue'
import { Question, RankingUser } from './types'

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
    active: Boolean
  }
})
</script>
