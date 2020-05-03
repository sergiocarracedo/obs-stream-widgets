<template>
  <div class="countdown">
    {{ countdown.targetDateTime }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  name: 'countdown',
  computed: {
    ...mapState(['countdown'])
  }
})
</script>
