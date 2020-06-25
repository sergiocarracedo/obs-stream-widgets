import Vue from 'vue'
import Vuex, { MutationTree, ActionTree, ModuleTree } from 'vuex'
import widgets from '../widgets'
import VuexPersistedState from 'vuex-persistedstate'
import modules from './modules'
import { Twitch, Youtube } from '@/types'
import { Platform } from '@/enums'

Vue.use(Vuex)

const state = {
  basePath: `${window.location.protocol}//${window.location.host}`,
  youtube: {} as Youtube,
  twitch: {} as Twitch,
  platform: Platform.YouTube
} as any

const mutations: MutationTree<any> = {
  SOCKET_SET_YOUTUBE: (state, youtube: Youtube) => {
    state.youtube = youtube
  },
  SOCKET_SET_TWITCH: (state, twitch: Twitch) => {
    state.twitch = twitch
  },
  SOCKET_SET_PLATFORM: (state, platform: Platform) => {
    state.platform = platform
  }

}

const actions: ActionTree<string, any> = {
}

Object.entries(widgets).forEach(([key, value]: any[]) => {
  if (value.store) {
    modules[value.namespace || key] = value.store
  }
})

export default new Vuex.Store({
  modules,
  state,
  actions,
  mutations,
  plugins: [
    VuexPersistedState({
      key: 'vigotech-obs-layouts'
    })
  ]
})
