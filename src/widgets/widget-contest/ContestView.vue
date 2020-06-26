<template>
  <div>
    <contest-ranking-widget
      v-if="!status.questionActive"
      :ranking="ranking"
    ></contest-ranking-widget>
    <contest-widget
      v-else
      :question="question"
    ></contest-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ContestWidget from './Contest.vue'
import ContestRankingWidget from './ContestRanking.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('contest')

export default Vue.extend({
  name: 'talk-view',
  components: {
    ContestWidget,
    ContestRankingWidget
  },
  computed: {
    ...mapState([
      'questions',
      'status'
    ]),
    ranking (): any[] {
      return []
    }
  }
})
</script>
