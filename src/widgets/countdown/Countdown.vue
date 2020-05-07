<template>
  <div class="countdown">
    {{ target}}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'countdown',
  props: {
    target: {
      type: [Date, Number]
    }
  }
})
</script>
