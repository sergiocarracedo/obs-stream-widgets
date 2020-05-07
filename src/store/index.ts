import Vue from 'vue'
import Vuex, { MutationTree, ActionTree, ModuleTree } from 'vuex'
import widgets from '@/widgets'
import VuexPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  title: '',
  basePath: `${window.location.protocol}//${window.location.host}`
} as any

const mutations: MutationTree<any> = {
  loading: (state, data) => {
    state.loading = data
  },
  SOCKET_SETTITLE: (state, title: string) => {
    state.title = title
  }
}

const actions: ActionTree<string, any> = {
  'socket_setTitle': (state, title: string) => {
    state.commit('SOCKET_SETTITLE', title)
  }
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
