<template>
  <div>
    <contest-widget
      :status="status.questionActive"
      :question="currentQuestion"
      :raking="ranking"
    ></contest-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ContestWidget from './Contest.vue'
import { createNamespacedHelpers } from 'vuex'
import {Question as QuestionType, Question} from '@/widgets/widget-contest/types'
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
    ranking (): any[] {
      return []
    },
    currentQuestion (): QuestionType {
      return this.$store.getters['contest/currentQuestion']
    }
  }
})
</script>
