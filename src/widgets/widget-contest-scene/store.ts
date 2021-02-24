import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '@/types'

const state: Map<any> = {
  background: ''
}

const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_CONTEST_SCENE_BG: (state: any, bg: string) => {
    state.background = bg
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
