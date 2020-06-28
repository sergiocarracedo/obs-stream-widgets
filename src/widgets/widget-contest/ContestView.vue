<template>
  <div class="contest-wrapper">
    <contest-widget
      :state="status.question.state"
      :question="currentQuestion"
      :ranking="ranking"
      :index="status.question.index + 1"
      :total="questions.length"
      :active="status.active"
    ></contest-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ContestWidget from './Contest.vue'
import { createNamespacedHelpers } from 'vuex'
import { Question as QuestionType, RankingUser } from '@/widgets/widget-contest/types'
const { mapState } = createNamespacedHelpers('contest')

export default Vue.extend({
  name: 'talk-view',
  components: {
    ContestWidget
  },
  computed: {
    ...mapState([
      'questions',
      'status'
    ]),
    ranking (): RankingUser[] {
      return this.status.ranking
    },
    currentQuestion (): QuestionType {
      return this.$store.getters['contest/currentQuestion']
    }
  }
})
</script>
