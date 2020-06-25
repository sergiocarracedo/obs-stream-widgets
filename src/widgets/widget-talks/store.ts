import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '@/types'
import { Talk } from './types'

const state: Map<any> = {
  talks: [] as Talk[],
  selectedTalk: 0
}

const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_TALKS: (state, talks: Talk[]) => {
    state.talks = talks
  },
  SOCKET_SET_SELECTED_TALK: (state, index: number) => {
    state.selectedTalk = index
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
