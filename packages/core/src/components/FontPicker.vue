<template>
  <v-select
    :items="items"
    label="Font"
    filled
    v-model="localValue"
  ></v-select>
</template>
<script lang="ts">
import Vue from 'vue'
import fonts from './google-fonts.json'

export default Vue.extend({
  name: 'font-picker',
  props: {
    value: String
  },
  data () {
    return {
      localValue: this.value,
      items: Object.keys(fonts)
    }
  },
  watch: {
    value (newValue:string) {
      this.localValue = newValue
    },
    localValue (newValue:string) {
      this.$emit('input', newValue)
    }
  }
})
</script>
