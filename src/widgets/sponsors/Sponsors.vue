<template>
  <div class="sponsors">
    <sponsor
      v-for="(sponsor, index) in sponsors"
      :key="index"
      :sponsor="sponsor"
    ></sponsor>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Sponsor from './Sponsor.vue'
import './Sponsors.scss'

export default Vue.extend({
  name: 'sponsors',
  components: {
    Sponsor
  },
  props: {
    sponsors: {
      type: Array
    }
  },
  data () {
    return {
      intervalId: null as number|null
    }
  },
  methods: {
    handler () {
      console.log('handler')
    }
  },
  beforeMount () {
    this.intervalId = setInterval(this.handler, 1000)
  },
  beforeDestroy () {
    clearInterval(this.intervalId as number)
  }
})
</script>
