<template>
  <div class="countdown">
    <div class="countdown-before" v-if="!isOver">
      <header>
        <h1>
          {{ textBefore }}
        </h1>
      </header>
      <div class="clock">
        <clock-sphere
          :value="remain.hours"
          :max-value="24"
          units="Horas"
          :color="color"
          :track-color="trackColor"
        ></clock-sphere>
        <clock-sphere
          :value="remain.minutes"
          units="Minutos"
          :color="color"
          :track-color="trackColor"
        ></clock-sphere>
        <clock-sphere
          :value="remain.seconds"
          units="Segundos"
          :color="color"
          :track-color="trackColor"
        ></clock-sphere>
      </div>
    </div>
    <div class="countdown-after" v-if="isOver">
      <header>
        <h1>
          {{ textAfter }}
        </h1>
      </header>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import ClockSphere from './ClockSphere.vue'
import './Countdown.scss'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)

export default Vue.extend({
  name: 'countdown',
  components: {
    ClockSphere
  },
  props: {
    target: {
      type: [Date, Number, String]
    },
    textBefore: String,
    textAfter: String,
    trackColor: {
      type: String,
      default: '#aaa'
    },
    color: {
      type: String,
      default: '#333'
    },
    textColor: {
      type: String,
      default: '#fff'
    }
  },
  data () {
    return {
      intervalId: null as number|null,
      remain: {
        hours: null as number|null,
        minutes: null as number|null,
        seconds: null as number|null
      },
      isOver: false,
      dayjs
    }
  },
  methods: {
    handler () {
      const date = dayjs(this.target)
      const now = new Date()
      this.remain = {
        hours: date.diff(now, 'hour'),
        minutes: date.diff(now, 'minute') % 60,
        seconds: date.diff(now, 'second') % 60
      }
      this.checkIsOver()
    },
    checkIsOver () {
      this.isOver = dayjs(this.target).isSameOrBefore(new Date(), 'second')
    }
  },
  beforeMount () {
    this.intervalId = +setInterval(this.handler, 1000)
  },
  beforeDestroy () {
    clearInterval(this.intervalId as number)
  }
})
</script>
