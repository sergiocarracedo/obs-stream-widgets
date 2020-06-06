import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '@/types'
import { Sponsor } from './types'

const state: Map<any> = {
  sponsors: [] as Sponsor[]
}

const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_SPONSORS: (state, sponsors: Sponsor[]) => {
    state.sponsors = sponsors
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
