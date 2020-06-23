<template>
  <span>
    <v-btn @click="onClick">
      <v-icon v-if="icon" left>{{ icon }}</v-icon>
      {{ text }}
    </v-btn>
    <input ref="uploader" type="file" class="d-none" :accept="accept" @change="onFileChanged" />
  </span>
</template>
<script lang="ts">
import Vue from 'vue'
import { readAndCompressImage } from 'browser-image-resizer'

export default Vue.extend({
  name: 'image-upload-btn',
  props: {
    maxWidth: Number,
    maxHeight: Number,
    icon: {
      type: String,
      default: 'mdi-file-upload'
    },
    text: {
      type: String,
      default: 'Upload image'
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    convertImagesToBase64: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toBase64 (file: File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    onClick () {
      (this.$refs.uploader as HTMLElement).click()
    },
    async onFileChanged (e: any) {
      const file = e.target.files[0]
      const read = new FileReader()

      read.readAsBinaryString(file)

      read.onloadend = async () => {
        if (this.maxWidth || this.maxHeight) {
          const imageResized = await readAndCompressImage(file, {
            maxWidth: 300,
            maxHeight: 300
          })

          if (this.convertImagesToBase64) {
            this.$emit('upload', await this.toBase64(imageResized) as string)
          } else {
            this.$emit('upload', imageResized)
          }
        } else {
          this.$emit('upload', read.result)
        }
      }
    }
  }

})
</script>
