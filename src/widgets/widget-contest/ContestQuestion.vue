<template>
  <div class="contest-question" v-if="question">
    <h1>{{ question.title }}</h1>
    <ul class="content-question-anwsers">
      <li v-for="(answer, index) in question.answers">
        <strong>{{ String.fromCharCode(65 + index) }}</strong> {{ answer.text }}
      </li>
    </ul>
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
    question: {
      type: Object as () => Question
    }
  }
})
</script>
