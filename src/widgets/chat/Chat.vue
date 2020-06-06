<template>
  <div class="chat">
    <ul>
      <transition-group name="fadeRight">
        <li v-for="message in messages" :key="message.id">
          {{ message.content }}
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import './Chat.scss'
import { Youtube, Map } from '@/types'
import YouTubeChat from 'youtube-live-chat'
import takeRight from 'lodash/takeRight'
import { ChatMessage } from './types'

const testMessages = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Morbi ac leo quis diam posuere sollicitudin non a dui.',
  'Vestibulum malesuada elit imperdiet ante tempor, ut posuere tellus bibendum.',
  'Maecenas accumsan sapien non lacus faucibus, at feugiat nulla aliquam.',
  'Proin condimentum tellus at justo efficitur, nec posuere sapien fringilla.',
  'Morbi quis orci consequat, rutrum urna at, scelerisque lectus.',
  'Etiam euismod velit at nunc scelerisque facilisis.',
  'Nulla venenatis eros pharetra elit efficitur placerat.',
  'Curabitur vitae lorem ullamcorper, pellentesque enim vitae, consequat metus.',
  'Proin consectetur dui in neque viverra dapibus.',
  'Mauris luctus mi id fermentum venenatis.',
  'Suspendisse pretium nisi a ante volutpat, in egestas nisl lobortis.',
  'In laoreet urna ac dui convallis congue.',
  'Vestibulum id turpis interdum, consectetur enim ut, consequat ante.',
  'Aliquam sit amet libero laoreet, commodo nisi eget, imperdiet enim.',
  'Nunc pulvinar leo eu purus vestibulum, nec interdum lorem egestas.',
  'Vestibulum sit amet risus nec nisi placerat sodales.',
  'Proin ultrices ipsum id dictum luctus.',
  'Curabitur iaculis erat ut semper pulvinar.',
  'Vestibulum vitae diam eu tortor mollis vestibulum ac eget felis.',
  'Pellentesque at tortor ac odio euismod tincidunt.',
  'Maecenas nec nisi nec sem interdum convallis nec et nibh.',
  'Nulla semper tortor ut mauris pretium, ut gravida eros convallis.',
  'Maecenas consequat dui at ante molestie ultrices.',
  'Aenean euismod sapien at libero malesuada sodales.',
  'Fusce tempus risus tempus mollis ultricies.',
  'Aenean consequat ante commodo lectus faucibus, eget tincidunt purus varius.',
  'Fusce dapibus dui ut enim dignissim pretium.',
  'Sed malesuada neque sed arcu pellentesque commodo.',
  'Phasellus laoreet eros eu scelerisque luctus.',
  'Praesent tincidunt nunc vel ultrices rhoncus.',
  'In ut arcu eget ex condimentum blandit.'
]

export default Vue.extend({
  name: 'chat',
  props: {
    youtubeSettings: {} as () => Youtube,
    testMode: Boolean
  },
  data () {
    return {
      youtubeChat: null as any,
      messages: [] as ChatMessage[],
      testInterval: null as number | null
    }
  },
  methods: {
    insertMessage (message: Map<any>) {
      const id = message.liveChatId as string
      if (this.messages.findIndex((item: ChatMessage) => item.id === id) === -1) {
        this.messages.push({
          content: message.displayMessage,
          id
        })
      }
      this.messages = takeRight(this.messages, 40)
    }
  },
  beforeMount () {
    if (this.testMode) {
      this.testInterval = setInterval(() => {
        this.insertMessage({
          liveChatId: (Math.random() * 100000).toFixed(0),
          displayMessage: testMessages[Math.floor(Math.random() * testMessages.length)]
        })
      }, 1000)
    } else {
      this.youtubeChat = new YouTubeChat(this.youtubeSettings.channelId, this.youtubeSettings.apiKey)

      this.youtubeChat.on('ready', () => {
        this.youtubeChat.listen(5000)
      })

      this.youtubeChat.on('message', (data: any) => {
        this.insertMessage(data.snippet)
      })

      this.youtubeChat.on('error', (error: any) => {
        if (error.error.code === 403) {
          this.youtubeChat.stop()
          console.error('API LIMIT EXCEEDED')
        } else {
          console.error(error)
        }
      })
    }
  },
  beforeDestroy () {
    if (this.testMode) {
      clearInterval(this.testInterval!)
    } else {
      this.youtubeChat.stop()
    }
  }
})
</script>
