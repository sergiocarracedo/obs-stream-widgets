<template>
  <div class="countdown-settings">
    <v-card class="mb-8">
      <v-card-title class="heading">
        Countdown
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6">
            <widget-url :url="widgetUrl"></widget-url>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="textBefore"
              label="Text before countdown is over"
              filled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="12">
            <v-text-field
              v-model="textAfter"
              label="Text after countdown is over"
              filled
            ></v-text-field>
          </v-col>
        </v-row>
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
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="menuDate = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" lg="6">
            <v-menu
              ref="menuTime"
              v-model="menuTime"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time"
                  label="Time"
                  hint="HH:MM format"
                  persistent-hint
                  prepend-icon="mdi-clock"
                  filled
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="menuTime" v-model="time" scrollable no-title format="24h" @click:minute="menuTime = false"></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-alert type="info" border="left" color="yellow" text>Size min 800x400px</v-alert>
    <countdown-widget
      :target="dateTime"
      :text-before="textBefore"
      :text-after="textAfter"
      :color="primaryColor"
      :track-color="primaryLightColor"
    ></countdown-widget>
  </div>
</template>
<script lang="ts">
import Widget from '@/mixins/Widget'
import WidgetUrl from '@/components/WidgetUrl.vue'
import CountdownWidget from './Countdown.vue'
import dayjs from 'dayjs'
import './CountdownSettings.scss'
import {createNamespacedHelpers} from 'vuex'
const themeHelpers = createNamespacedHelpers('theme')
const mapStateTheme = themeHelpers.mapState

export default Widget.extend({
  name: 'countdown-settings',
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
    dateTime (): number {
      return this.$store.state.countdown.targetDate
    },
    date: {
      get (): string {
        return dayjs(this.$store.state.countdown.targetDate || new Date()).format('YYYY-MM-DD')
      },
      set (value: string):void {
        const [year, month, day] = value.split('-')
        const dateTime = dayjs(this.$store.state.countdown.targetDate || new Date())
          .set('year', +year)
          .set('month', +month - 1)
          .set('date', +day)

        this.commitAndEmit('SET_TARGET_DATE', 'countdown', dateTime)
      }
    },
    time: {
      get (): string {
        return dayjs(this.$store.state.countdown.targetDate || new Date()).format('HH:mm')
      },
      set (value: string):void {
        const [hours, minutes] = value.split(':')
        const dateTime = dayjs(this.$store.state.countdown.targetDate || new Date())
          .set('hour', +hours)
          .set('minute', +minutes)
        this.commitAndEmit('SET_TARGET_DATE', 'countdown', dateTime)
      }
    },
    textBefore: {
      get (): string {
        return this.$store.state.countdown.textBefore
      },
      set (value: string):void {
        this.commitAndEmit('SET_TEXT_BEFORE', 'countdown', value)
      }
    },
    textAfter: {
      get (): string {
        return this.$store.state.countdown.textAfter
      },
      set (value: string):void {
        this.commitAndEmit('SET_TEXT_AFTER', 'countdown', value)
      }
    },
    widgetUrl () {
      return `${this.$store.state.basePath}/widget/countdown/`
    },
    ...mapStateTheme({
      primaryColor: 'primary',
      primaryLightColor: 'primaryLight'
    })
  },
  methods: {
    parseDate (date: string): string {
      return dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }
  },
  watch: {
    date (val: string):void {
      this.dateFormatted = dayjs(val).format('DD/MM/YYYY')
    }
  },
  beforeMount () {
    this.dateFormatted = dayjs(this.date).format('DD/MM/YYYY')
  }
})
</script>
