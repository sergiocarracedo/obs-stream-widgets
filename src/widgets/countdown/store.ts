import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '@/interfaces'
import dayjs from 'dayjs'

const state: Map<any> = {
  targetDate: 0 as number
}

const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_TARGET_DATE: (state, target: Date | number) => {
    state.targetDate = +dayjs(target)
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
