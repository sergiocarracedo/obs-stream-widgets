<template>
  <div class="contest-question">
    <h1>{{ question.title }}</h1>
    <div class="content-question-answers">
      <div
        v-for="(answer, index) in question.answers"
        :key="index"
        :class="{
          'content-question-answer': true,
          'primary-light-bg': showCorrect && !answer.correct,
          'primary-bg': !showCorrect || answer.correct,
          'text-dark': showCorrect && !answer.correct
        }"
      >
        <strong>{{ String.fromCharCode(65 + index) }}</strong> {{ answer.text }}
      </div>
    </div>
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
    },
    showCorrect: Boolean
  }
})
</script>
