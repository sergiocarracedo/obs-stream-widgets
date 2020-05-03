<template>
  <div class="countdown-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Countdown
      </v-card-title>

      <v-card-text>
        <widget-url :url="'http://base/countdown/'"></widget-url>

        <v-row>
          <v-col cols="12" lg="6">
            <v-menu
              ref="menuDate"
              v-model="menuDate"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Date"
                  hint="DD/MM/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  filled
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="menuDate = false"></v-date-picker>
            </v-menu>
            <p>Date in ISO format: <strong>{{ date }}</strong></p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <countdown-widget></countdown-widget>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WidgetUrl from '@/components/WidgetUrl.vue'
import CountdownWidget from '@/views/Countdown.vue'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'general-settings',
  components: {
    WidgetUrl,
    CountdownWidget
  },
  data () {
    return {
      menuDate: false,
      menuTime: false,
      dateFormatted: ''
    }
  },
  computed: {
    date: {
      get (): string {
        console.log('test', this.$store.state)
        return dayjs(this.$store.state.countdown.targetDate || new Date()).format('YYYY-MM-DD')
      },
      set (value: string):void {
        this.$store.commit('countdown/SOCKET_SET_TARGET_DATE', value)
        // this.$socket.client.emit('setTitle', value)
        // this.$store.dispatch('socket_setTitle', value)
      }
    }
  },
  methods: {
    parseDate (date: string): string {
      return dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }
  },
  watch: {
    date (val: string):void {
      this.dateFormatted = dayjs(this.date).format('DD/MM/YYYY')
    }
  }
})
</script>
