<template>
  <div class="widget-url d-flex">
    <v-text-field
      label="Widget url"
      color="primary"
      disabled
      :value="url"
      filled
    ></v-text-field>
    <v-spacer class="mx-2"></v-spacer>
    <v-btn @click="onClick" fab color="gray lighten-4" title="Copy to cilpboard">
      <v-icon>mdi-clipboard</v-icon>
    </v-btn>
  </div>
</template>
<script lant="ts">
import { defineComponent } from '@vue/composition-api'
import { useClipboard } from 'vue-use-web'

export default defineComponent({
  name: 'widget-url',
  setup ({ url }) {
    console.log('aqui')
    const { write } = useClipboard()

    function onClick () {
      write(url)
    }

    return {
      onClick
    }
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  beforeMount () {
    console.log(process.env)
    console.log('here')
  }
})
</script>
