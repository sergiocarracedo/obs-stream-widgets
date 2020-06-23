import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '@/types'

const state: Map<any> = {
  primary: '#0068FF',
  primaryLight: '#CCE1FF'
}


const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_PRIMARY: (state, color: string) => {
    state.primary = color
  },
  SOCKET_SET_PRIMARY_LIGHT: (state, color: string) => {
    state.primaryLight = color
  },
}

const actions: ActionTree<Map<any>, any> = {}

const getters: GetterTree<Map<any>, any> = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
