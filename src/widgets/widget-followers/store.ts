import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '@/types'

const state: Map<any> = {
  logo: ''
}

const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_LOGO: (state, logo: string) => {
    state.logo = logo
  }
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
