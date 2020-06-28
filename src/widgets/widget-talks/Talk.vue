<template>
  <div :class="classes">
    <div class="talk">
      <div class="speaker">
        <div class="picture-wrapper primary-light-bg primary-border" v-if="talk.speaker.picture" :style="{ backgroundImage: `url(${talk.speaker.picture})` }">
        </div>
        <h3 class="primary-light-color">{{ talk.speaker.name }}</h3>
      </div>
      <h1>{{ talk.title }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import './Talks.scss'
import { Talk } from './types'
import { Map } from '@/types'

export default Vue.extend({
  name: 'talk',
  components: {},
  props: {
    talk: {
      type: Object as () => Talk[]
    },
    mode: {
      type: String,
      default: 'normal'
    }
  },
  data () {
    return {}
  },
  computed: {
    classes (): Map<boolean> {
      const classes = {
        'talk-wrapper': true
      } as Map<boolean>

      classes[`mode-${this.mode || 'normal'}`] = true

      if (this.mode === 'banner') {
        classes[`primary-bg`] = true
      }
      return classes
    }

  }
})
</script>
