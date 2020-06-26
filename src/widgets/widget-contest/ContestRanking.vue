<template>
  <div class="contest-ranking">
    <h1>Ranking</h1>
    <ul>
      <li
        v-for="(item, index) in ranking"
        :class="{'ranking-item': true, 'primary-bg': index < 3, 'primary-light-bg': index >= 3 }">
        <strong>{{ index + 1 }}</strong> {{ item.username }} {{ item.points }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import './Contest.scss'
import { RankingUser } from './types'

export default Vue.extend({
  name: 'contest',
  components: {},
  props: {
    ranking: {
      type: Array as () => RankingUser[]
    }
  },
  data () {
    return {}
  }
})
</script>
