<template>
  <div class="clock-sphere" :style="styles">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${size} ${size}`"
      preserveAspectRatio="xMidYMid meet"
      style="transform: rotate(-90deg);"
    >
      <circle
        fill="transparent"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke-width="width"
        :stroke="trackColor"
        class="bg"
      />

      <circle
        fill="transparent"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke-width="width"
        :stroke-dasharray="strokeDashArray"
        :stroke-dashoffset="strokeDashOffset"
        :stroke="color"
        class="donut" />
    </svg>
    <div class="clock-sphere-content" :style="{ 'color': textColor }">
      <h3>{{ value }}</h3>
      <span>{{ units }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import './Sponsors.scss'
interface Map<T> {
  [key:string]: T;
}

export default Vue.extend({
  name: 'clock-sphere',
  props: {
    value: {
      type: Number
    },
    maxValue: {
      type: Number,
      default: 60
    },
    size: {
      type: Number,
      default: 200
    },
    width: {
      type: Number,
      default: 10
    },
    units: String,
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
      localValue: this.value as number
    }
  },
  computed: {
    styles (): Map<string|number> {
      return {
        maxWidth: `${this.size}px`,
        width: `${this.size}px`,
        height: `${this.size}px`
      } as Map<string|number>
    },
    radius (): number {
      return this.size / 2 - this.width / 2
    },
    circumference (): number {
      return 2 * Math.PI * this.radius
    },
    strokeDashArray (): string {
      return `${Math.round(this.circumference * 1000) / 1000} `
    },
    normalizedValue (): number {
      const value = this.value / this.maxValue * 100
      if (value < 0) {
        return 0
      }
      return value % 100
    },
    strokeDashOffset (): string {
      return ((100 - this.normalizedValue) / 100) * this.circumference + 'px'
    }
  }
})
</script>
