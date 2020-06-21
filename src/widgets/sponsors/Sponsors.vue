<template>
  <div class="sponsors">
    <transition name="fade" mode="out-in" v-if="sponsor">
      <sponsor
        :key="sponsor.name"
        :sponsor="sponsor"
      ></sponsor>
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Sponsor from './Sponsor.vue'
import './Sponsors.scss'
import { Map } from '@/types'
import { Sponsor as SponsorType } from './types'

export default Vue.extend({
  name: 'sponsors',
  components: {
    Sponsor
  },
  props: {
    sponsors: {
      type: Array as () => SponsorType[]
    },
    timeout: {
      type: Number,
      default: 5000
    }
  },
  data () {
    return {
      intervalId: null as number|null,
      index: 0 as number
    }
  },
  computed: {
    sponsor (): Map<any> {
      return this.sponsors[this.index % this.sponsors.length] || {} as Map<any>
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
