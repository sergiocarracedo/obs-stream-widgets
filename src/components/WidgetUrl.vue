<template>
  <div class="widget-url d-flex">
    <v-text-field
      :label="label || 'Widget url'"
      color="primary"
      disabled
      :value="url"
      filled
    ></v-text-field>
    <v-btn @click="onClick" fab color="primary" class="ml-2" title="Copy to cilpboard">
      <v-icon>mdi-clipboard</v-icon>
    </v-btn>

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      Url copied to clipboard
      <template v-slot:action>
        <v-btn
          color="primary"
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script lant="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useClipboard } from 'vue-use-web'

export default defineComponent({
  name: 'widget-url',
  setup ({ url }) {
    const { write } = useClipboard()
    const snackbar = ref(false)

    function onClick () {
      write(url)
      snackbar.value = true
    }

    return {
      onClick,
      snackbar
    }
  },
  props: {
    url: {
      type: String,
      required: true
    },
    label: String
  }
})
</script>
