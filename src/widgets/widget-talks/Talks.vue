<template>
  <div class="talks">
    <transition name="fade" mode="out-in" v-if="talk">
      <talk
        :key="talk.title"
        :talk="talk"
        :mode="mode"
      ></talk>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Talk from './Talk.vue'
import { Map } from '@/types'
import { Talk as TalkType } from './types'

export default Vue.extend({
  name: 'talks',
  components: {
    Talk
  },
  props: {
    talks: {
      type: Array as () => TalkType[]
    },
    timeout: {
      type: Number,
      default: 5000
    },
    mode: String
  },
  data () {
    return {
      intervalId: null as number|null,
      index: 0 as number
    }
  },
  computed: {
    talk (): Map<any> {
      return this.talks[this.index % this.talks.length] || {} as Map<any>
    }
  },
  methods: {
    handler () {
      this.index++
    }
  },
  beforeMount () {
    this.intervalId = <any>setInterval(this.handler, this.timeout)
  },
  beforeDestroy () {
    clearInterval(this.intervalId as number)
  }
})
</script>
