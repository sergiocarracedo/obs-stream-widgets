import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { Map } from '../core-utils/types'
import dayjs from 'dayjs'

const state: Map<any> = {
  targetDate: 0 as number,
  textAfter: '',
  textBefore: ''
}

const mutations: MutationTree<Map<any>> = {
  SOCKET_SET_TARGET_DATE: (state, target: Date | number) => {
    state.targetDate = +dayjs(target)
  },
  SOCKET_SET_TEXT_BEFORE: (state, payload: string) => {
    state.textBefore = payload
  },
  SOCKET_SET_TEXT_AFTER: (state, payload: string) => {
    state.textAfter = payload
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
