<template>
  <div class="contest" v-if="questions">
    <h1>{{ questions.name }}</h1>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import './Contest.scss'
import { Question } from './types'

export default Vue.extend({
  name: 'contest',
  components: {},
  props: {
    questions: {
      type: Array as () => Question[]
    }
  },
  data () {
    return {}
  }
})
</script>
