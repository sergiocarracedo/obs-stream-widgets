<template>
  <div class="import-export-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Export settings
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-btn :href="downloadStateUrl" download="obs-stream-widget-stage.json">
              <v-icon left>mdi-cloud-download</v-icon>Export
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-8">
      <v-card-title class="heading">
        Import settings
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <v-btn @click="onImportClick">
              <v-icon left>mdi-cloud-upload</v-icon>
              Import
            </v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              accept="text/json"
              @change="onFileChanged"
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      Settings imported
      <v-btn
        color="primary"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'global-settings',
  components: {},
  data () {
    return {
      snackbar: false
    }
  },
  computed: {
    downloadStateUrl (): string {
      const data = new Blob([JSON.stringify(this.$store.state)], { type: 'text/json '})
      return window.URL.createObjectURL(data)
    }
  },
  methods: {
    onImportClick () {
      (this.$refs.uploader as HTMLElement).click()
    },
    onFileChanged (e: any) {
      const file = e.target.files[0]
      const read = new FileReader()

      read.readAsBinaryString(file)

      read.onloadend = () => {
        const result = JSON.parse(read.result as string)
        this.$store.replaceState(result)
        this.snackbar = true
      }
    }
  }
})
</script>
