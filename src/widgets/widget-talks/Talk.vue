<template>
  <div class="talk" v-if="talk">
    <div class="speaker">
      <div class="picture-wrapper primary-light-bg primary-border" v-if="talk.speaker.picture" :style="{ backgroundImage: `url(${talk.speaker.picture})` }">
      </div>
      <h3 class="primary-light-color">{{ talk.speaker.name }}</h3>
    </div>
    <h1>{{ talk.title }}</h1>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import './Talks.scss'
import { Talk } from './types'

export default Vue.extend({
  name: 'talk',
  components: {},
  props: {
    talk: {
      type: Object as () => Talk[]
    }
  },
  data () {
    return {}
  }
})
</script>
