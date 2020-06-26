import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionApi from '@vue/composition-api'
import VueSocketIO from 'vue-socket.io-extended'
import vuetify from './plugins/vuetify'
import io from 'socket.io-client'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/scss/app.scss'
import VuetifyConfirm from 'vuetify-confirm'

Vue.use(VueCompositionApi)

const socket = io(process.env.VUE_APP_SOCKET as string)
Vue.use(VueSocketIO, socket, { store })
Vue.config.productionTip = false
Vue.use(VuetifyConfirm, { vuetify })

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
