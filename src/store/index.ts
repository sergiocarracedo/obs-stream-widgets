import Vue from 'vue'
import Vuex, { MutationTree, ActionTree, ModuleTree } from 'vuex'
import widgets from '@/widgets'
import VuexPersistedState from 'vuex-persistedstate'
import { Youtube } from '@/types'

Vue.use(Vuex)

const state = {
  basePath: `${window.location.protocol}//${window.location.host}`,
  youtube: {} as Youtube
} as any

const mutations: MutationTree<any> = {
  SOCKET_SET_YOUTUBE: (state, youtube: Youtube) => {
    state.youtube = youtube
  }
}

const actions: ActionTree<string, any> = {
}

const modules = {} as ModuleTree<string>
Object.entries(widgets).forEach(([key, value]: any[]) => {
  if (value.store) {
    modules[key] = value.store
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
